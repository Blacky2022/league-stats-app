import { Request, Response, Router } from 'express'
import { importData } from '../utils/import_db'
import tokenMiddleware from '../middlewares/token.middleware'
import { createChampionPerformanceModel } from '../models/ranked_champion.model'
import mongoose, { Model } from 'mongoose'

interface ChampionRoleStats {
	Tier: string
	Score: number
	Trend: number
	Win: number
	RoleRate: number
	Pick: number
	Ban: number
	KDA: number
}

export const performanceRouter = Router()

performanceRouter
	.post('/importData', tokenMiddleware.auth, async (req: Request, res: Response): Promise<void> => {
		try {
			await importData()
			res.json({ message: 'Dane zostały zaimportowane do bazy danych.' })
		} catch (error) {
			console.error('Błąd importowania danych:', error)
			res.status(500).json({ error: 'Błąd importowania danych do bazy danych.' })
		}
	})
	.get('/:name/stats/:selectedPatch', async (req: Request, res: Response): Promise<void> => {
		const championName = req.params.name
		const patchNumber = req.params.selectedPatch
		console.log({ championName, patchNumber })

		const collectionName = `champion_performance_12_${patchNumber}`

		try {
			let ChampionPerformanceModelPatch: Model<any>

			if (mongoose.models[collectionName]) {
				ChampionPerformanceModelPatch = mongoose.models[collectionName]
			} else {
				ChampionPerformanceModelPatch = createChampionPerformanceModel(Number(patchNumber))
				console.log({ ChampionPerformanceModelPatch })
			}

			const championStats = await ChampionPerformanceModelPatch.find({ Name: championName }).exec()
			console.log({ championStats })

			if (!championStats || championStats.length === 0) {
				
				res.status(404).json({ error: 'Champion not found.' })
			} else {

				const statsByRole: { [key: string]: ChampionRoleStats } = {}

				championStats.forEach((stats: any) => {
					const { Role, Tier, Score, Trend, Win, RoleRate, Pick, Ban, KDA } = stats
					console.log(Role)
					if (!statsByRole[Role]) {
						statsByRole[Role] = {
							Tier,
							Score,
							Trend: parseFloat(Trend),
							Win: parseFloat(Win),
							RoleRate: parseFloat(RoleRate),
							Pick: parseFloat(Pick),
							Ban: parseFloat(Ban),
							KDA: parseFloat(KDA),
						}
					}
				})
				console.log(statsByRole)
				res.json(statsByRole)
			}
		} catch (error) {
			console.error('Błąd pobierania statystyk postaci:', error)
			res.status(500).json({ error: 'Błąd pobierania statystyk postaci.' })
		}
	})
