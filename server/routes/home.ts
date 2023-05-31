import { Request, Response, Router } from 'express'
import { ValidationError } from '../utils/error'
import { importData } from '../utils/import_db'
export const homeRouter = Router()
homeRouter
.get('/', (req: Request, res: Response): void => {
	res.json({
        message: "Polaczenie dziala"
    })
})
.post('/importData', async (req: Request, res: Response): Promise<void> => {
    try {
      await importData();
      res.json({ message: 'Dane zostały zaimportowane do bazy danych.' });
    } catch (error) {
      console.error('Błąd importowania danych:', error);
      res.status(500).json({ error: 'Błąd importowania danych do bazy danych.' });
    }
  })
