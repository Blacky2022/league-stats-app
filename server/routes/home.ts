import { Request, Response, Router } from 'express'
import { ValidationError } from '../utils/error'
import { importData } from '../utils/import_db'
import tokenMiddleware from '../middlewares/token.middleware'
export const homeRouter = Router()
homeRouter
.get('/', (req: Request, res: Response): void => {
	res.json({
        message: "Polaczenie dziala"
    })
})

