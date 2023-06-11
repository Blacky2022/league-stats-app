import { Request, Response, Router } from 'express'
import { ValidationError } from '../utils/error'
import { importDataCSV } from '../utils/import_csv'
import tokenMiddleware from '../middlewares/token.middleware'
import clearDatabase from '../utils/clear_db'
import { importDataJSON } from '../utils/import_json'
export const homeRouter = Router()
homeRouter
	.get('/', (req: Request, res: Response): void => {
		res.json({
			message: 'Polaczenie dziala',
		})
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
	.post('/importJSON', tokenMiddleware.auth, async (req: Request, res: Response): Promise<void> => {
		try {
			await importDataJSON()
			res.json({ message: 'Dane zostały zaimportowane do bazy danych.' })
		} catch (error) {
			console.error('Błąd importowania danych:', error)
			res.status(500).json({ error: 'Błąd importowania danych do bazy danych.' })
		}
	})
