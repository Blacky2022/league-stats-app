import { Request, Response, Router } from 'express'
import mongoose from '../utils/db'
import { createChangesModel } from '../models/champion_changes'
import { Model } from 'mongoose'

export const seasonRouter = Router()

seasonRouter
	.get('/champions', async (req: Request, res: Response): Promise<void> => {
		try {
			res.json({})
		} catch (error) {
			res.status(500).json({
				error: error.message,
			})
		}
	})
	.put('/changes/edit', async (req, res) => {
		const { name, selectedPatch } = req.body
		const { description, isBuff } = req.body

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
				return res.status(404).json({ message: 'Postać nie została zmodyfikowana w tym czasie.' })
			}

			res.json(updatedChampionChanges)
		} catch (error) {
			console.error('Błąd podczas aktualizacji zmian postaci:', error)
			res.status(500).json({ message: 'Wewnętrzny błąd serwera.' })
		}
	})
	.post('/:name/patch/:selectedPatch', async (req, res) => {
		const { name, selectedPatch } = req.params
		const { description, isBuff } = req.body

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
			console.error('Błąd podczas dodawania nowych zmian postaci:', error)
			res.status(500).json({ message: 'Wewnętrzny błąd serwera.' })
		}
	})
