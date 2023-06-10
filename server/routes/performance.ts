import { Request, Response, Router } from 'express'
import { importData } from '../utils/import_db'
import tokenMiddleware from '../middlewares/token.middleware'

export const performanceRouter = Router()

performanceRouter.post('/importData', tokenMiddleware.auth, async (req: Request, res: Response): Promise<void> => {
	try {
		await importData()
		res.json({ message: 'Dane zostały zaimportowane do bazy danych.' })
	} catch (error) {
		console.error('Błąd importowania danych:', error)
		res.status(500).json({ error: 'Błąd importowania danych do bazy danych.' })
	}
})
