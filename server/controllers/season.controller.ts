import { Request, Response } from 'express'
import mongoose from '../utils/db'
import { createChangesModel } from '../models/champion_changes'
import { Model } from 'mongoose'

export const getChampions = async (req: Request, res: Response): Promise<void> => {
	try {
		res.json({})
	} catch (error) {
		res.status(500).json({
			error: error.message,
		})
	}
}

export const editChanges = async (req: Request, res: Response): Promise<any> => {
	const { name, selectedPatch, description, isBuff } = req.body

	if (!name || !selectedPatch || !description || typeof isBuff !== 'boolean') {
		res.status(400).json({ error: 'Invalid request. Name, selectedPatch, description, and isBuff are required.' })
		return
	}

	const collectionName = `champion_changes_${selectedPatch}`
	try {
		let ChampionChangesModelPatch: Model<any>

		if (mongoose.models[collectionName]) {
			ChampionChangesModelPatch = mongoose.models[collectionName]
		} else {
			ChampionChangesModelPatch = createChangesModel(Number(selectedPatch))
			console.log({ ChampionChangesModelPatch })
		}

		const updatedChampionChanges = await ChampionChangesModelPatch.findOneAndUpdate(
			{ bohater: name },
			{ opis: description, czy_buff: isBuff },
			{ new: true }
		).lean()

		if (!updatedChampionChanges) {
			return res.status(404).json({ message: 'Champion was not modified during this time.' })
		}

		res.json(updatedChampionChanges)
	} catch (error) {
		console.error('Error updating champion changes:', error)
		res.status(500).json({ message: 'Internal server error.' })
	}
}

export const addChanges = async (req: Request, res: Response): Promise<any> => {
	const { name, selectedPatch } = req.params
	const { description, isBuff } = req.body

	if (!name || !selectedPatch || !description || typeof isBuff !== 'boolean') {
		res.status(400).json({ error: 'Invalid request. Name, selectedPatch, description, and isBuff are required.' })
		return
	}

	const collectionName = `champion_changes_${selectedPatch}`
	const ChampionChangesModelPatch = mongoose.models[collectionName] || createChangesModel(Number(selectedPatch))

	try {
		const newChampionChanges = new ChampionChangesModelPatch({
			bohater: name,
			opis: description,
			czy_buff: isBuff,
		})

		await newChampionChanges.save()

		res.json(newChampionChanges)
	} catch (error) {
		console.error('Error adding new champion changes:', error)
		res.status(500).json({ message: 'Internal server error.' })
	}
}
