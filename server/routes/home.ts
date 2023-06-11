import { Request, Response, Router } from 'express'
import { ValidationError } from '../utils/error'
import { importData } from '../utils/import_db'
import tokenMiddleware from '../middlewares/token.middleware'
import clearDatabase from '../utils/clear_db'
export const homeRouter = Router()
homeRouter
.get('/', (req: Request, res: Response): void => {
	res.json({
        message: "Polaczenie dziala"
    })
})
.get('/cleardata', (req: Request, res: Response): void => {
    clearDatabase()
      .then(() => {
        res.json({ message: 'Database cleared successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to clear database' });
      });
  });

