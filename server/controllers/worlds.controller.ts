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

export const getCompare = async (req: Request, res: Response): Promise<void> => {
	const { name, comparedName } = req.params
	try {
		const firstChampion = await WorldsChampionModel.findOne({ champion: name })
		const compareChampion = await WorldsChampionModel.findOne({ champion: comparedName })
		if (!firstChampion || !compareChampion) {
			res.status(404).json({ error: 'One or both champions not found.' })
			return
		}
		res.json({ firstChampion, compareChampion })
	} catch (error) {
		console.error('Error retrieving champions:', error)
		res.status(500).json({ error: 'Error retrieving champions from the database.' })
	}
}
