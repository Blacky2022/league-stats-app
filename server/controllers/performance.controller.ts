import { Request, Response } from 'express'
import { createChampionPerformanceModel } from '../models/ranked_champion.model'
import mongoose, { Model } from 'mongoose'
import { createChangesModel } from '../models/champion_changes'
import { ChampionRoleStats } from '../types/performance'
import { FilterQuery, ProjectionType, QueryOptions, Document } from 'mongoose'
interface patchNotes {
	opis: string
	czy_buff: boolean
}

interface ComparingChampionPatchNotes {
	patchNotes: patchNotes[]
	comparedPatchNotes: patchNotes[]
}
interface PatchNotesDocument extends Document {
	opis: string
	czy_buff: boolean
}
export const getChampionStats = async (req: Request, res: Response): Promise<void> => {
	const championName = req.params.name
	const patchNumber = req.params.selectedPatch

	if (!championName || !patchNumber) {
		res.status(400).json({ error: 'Champion name and patch number are required.' })
		return
	}

	const collectionName = `champion_performance_12_${patchNumber}`

	try {
		let ChampionPerformanceModelPatch: Model<any>

		if (mongoose.models[collectionName]) {
			ChampionPerformanceModelPatch = mongoose.models[collectionName]
		} else {
			ChampionPerformanceModelPatch = createChampionPerformanceModel(Number(patchNumber))
		}

		const championStats = await ChampionPerformanceModelPatch.find({ Name: championName }).exec()

		if (!championStats || championStats.length === 0) {
			res.status(404).json({ error: 'Champion not found.' })
			return
		}

		const statsByRole: { [key: string]: ChampionRoleStats } = {}

		championStats.forEach((stats: any) => {
			const { Role, Tier, Score, Trend, Win, RoleRate, Pick, Ban, KDA } = stats
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

		res.json(statsByRole)
	} catch (error) {
		console.error('Error retrieving champion stats:', error)
		res.status(500).json({ error: 'Failed to retrieve champion stats.' })
	}
}

export const getChampionChanges = async (req: Request, res: Response): Promise<void> => {
	const { name, selectedPatch } = req.params

	if (!name || !selectedPatch) {
		res.status(400).json({ error: 'Champion name and selected patch are required.' })
		return
	}

	const collectionName = `champion_changes_${selectedPatch}`

	try {
		let ChampionChangesModelPatch: Model<any>

		if (mongoose.models[collectionName]) {
			ChampionChangesModelPatch = mongoose.models[collectionName]
		} else {
			ChampionChangesModelPatch = createChangesModel(Number(selectedPatch))
		}

		const championChanges = await ChampionChangesModelPatch.findOne({ bohater: name }).lean()

		if (!championChanges) {
			res.status(404).json({ message: 'Champion was not modified during this time.' })
			return
		}

		res.json(championChanges)
	} catch (error) {
		console.error('Error retrieving champion changes:', error)
		res.status(500).json({ error: 'Failed to retrieve champion changes.' })
	}
}

export const getComparingChampionPatchNotes = async (req: Request, res: Response): Promise<void> => {
	const { start: startPatch, end: endPatch, name: championName, comparedName } = req.params
	if (!championName || !startPatch || !endPatch || !comparedName) {
		res.status(400).json({ error: 'Champion name, start patch, end patch, and compared name are required.' })
		return
	}

	try {
		const patchNotes: { patchNumber: number; opis: string; czy_buff: boolean }[] = []
		const comparedPatchNotes: { patchNumber: number; opis: string; czy_buff: boolean }[] = []

		for (let patchNumber = Number(startPatch); patchNumber <= Number(endPatch); patchNumber++) {
			const collectionName = `champion_patch_notes_${patchNumber}`
			const ChampionPatchNotesModel: Model<PatchNotesDocument> =
				mongoose.models[collectionName] || createChangesModel(Number(patchNumber))

			const notes: PatchNotesDocument | null = await ChampionPatchNotesModel.findOne({ bohater: championName }).exec()
			const comparedNotes: PatchNotesDocument | null = await ChampionPatchNotesModel.findOne({
				bohater: comparedName,
			}).exec()

			if (notes) {
				const { opis, czy_buff } = notes
				patchNotes.push({ patchNumber, opis, czy_buff })
			}
			if (comparedNotes) {
				const { opis, czy_buff } = comparedNotes
				comparedPatchNotes.push({ patchNumber, opis, czy_buff })
			}
		}

		if (patchNotes.length === 0) {
			res.status(404).json({ error: 'Patch notes not found for the given champion and patch range.' })
			return
		}

		res.json({ patchNotes, comparedPatchNotes })
	} catch (error) {
		console.error('Error retrieving champion patch notes:', error)
		res.status(500).json({ error: 'Failed to retrieve champion patch notes.' })
	}
}
