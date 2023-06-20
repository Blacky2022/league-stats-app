import { Request, Response, Router } from 'express'
import { ValidationError } from '../utils/error'
import { importDataXML } from '../utils/import_xml'
import { WorldsChampionModel } from '../models/worlds_champion.model'
export const worldsRouter = Router()
		//pobranie postaci z mistrzostw
	.get('/champions', async (req: Request, res: Response): Promise<void> => {
		try {
			const champions = await WorldsChampionModel.find()
			res.json(champions || [])
		} catch (error) {
			console.error('Błąd pobierania postaci:', error)
			res.status(500).json({ error: 'Błąd pobierania postaci z bazy danych.' })
		}
	})
