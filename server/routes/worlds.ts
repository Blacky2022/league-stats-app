import { Request, Response, Router } from 'express'
import { ValidationError } from '../utils/error'
import { importDataXML } from '../utils/import_xml'
import { WorldsChampionModel } from '../models/worlds_champion.model'
export const worldsRouter = Router()
	.post('/importXML', async (req: Request, res: Response): Promise<void> => {
		try {
			await importDataXML()
			res.json({ message: 'Dane zostały zaimportowane do bazy danych.' })
		} catch (error) {
			console.error('Błąd importowania danych:', error)
			res.status(500).json({ error: 'Błąd importowania danych do bazy danych.' })
		}
	})
	.get('/champions', async (req: Request, res: Response): Promise<void> => {
		try {
			const champions = await WorldsChampionModel.find()
			res.json(champions || [])
		} catch (error) {
			console.error('Błąd pobierania postaci:', error)
			res.status(500).json({ error: 'Błąd pobierania postaci z bazy danych.' })
		}
	})
