import { Request, Response, Router } from 'express'
import { importDataCSV } from '../utils/import_csv'
import clearDatabase from '../utils/clear_db'
import { importDataJSON } from '../utils/import_json'
import { importDataXML } from '../utils/import_xml'
export const homeRouter = Router()
homeRouter
	.get('/', (req: Request, res: Response): void => {
		res.json({
			message: 'Polaczenie dziala',
		})
	})
	.post('/importCSV', async (req: Request, res: Response): Promise<void> => {
		try {
			await importDataCSV()
			res.json({ message: 'Dane zostały zaimportowane do bazy danych.' })
		} catch (error) {
			console.error('Błąd importowania danych:', error)
			res.status(500).json({ error: 'Błąd importowania danych do bazy danych.' })
		}
	})
	.post('/importXML', async (req: Request, res: Response): Promise<void> => {
		try {
			await importDataXML()
			res.json({ message: 'Dane zostały zaimportowane do bazy danych.' })
		} catch (error) {
			console.error('Błąd importowania danych:', error)
			res.status(500).json({ error: 'Błąd importowania danych do bazy danych.' })
		}
	})
	.post('/importJSON', async (req: Request, res: Response): Promise<void> => {
		try {
			await importDataJSON()
			res.json({ message: 'Dane zostały zaimportowane do bazy danych.' })
		} catch (error) {
			console.error('Błąd importowania danych:', error)
			res.status(500).json({ error: 'Błąd importowania danych do bazy danych.' })
		}
	})
	.get('/cleardata', (req: Request, res: Response): void => {
		clearDatabase()
			.then(() => {
				res.json({ message: 'Database cleared successfully' })
			})
			.catch(error => {
				res.status(500).json({ error: 'Failed to clear database' })
			})
	})
