import { Request, Response } from 'express'
import { WorldsChampionModel } from '../models/worlds_champion.model'

export const getChampions = async (req: Request, res: Response): Promise<void> => {
	try {
		const champions = await WorldsChampionModel.find()
		res.json(champions || [])
	} catch (error) {
		console.error('Error retrieving champions:', error)
		res.status(500).json({ error: 'Error retrieving champions from the database.' })
	}
}
