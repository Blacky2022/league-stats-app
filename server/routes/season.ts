import { Request, Response, Router } from 'express'
import { ValidationError } from '../utils/error'

export const seasonRouter = Router()

seasonRouter
    
	.get('/champions', async (req: Request, res: Response): Promise<void> => {
		try {
			res.json({
				
			})
		} catch (error) {
			res.status(500).json({
				error: error.message,
			})
		}
	})