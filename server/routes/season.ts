import { Router } from 'express'
import { editChanges, getChampions, addChanges } from '../controllers/season.controller'

export const seasonRouter = Router()

seasonRouter
	.get('/champions', getChampions)
	.put('/changes/edit', editChanges)
	.post('/:name/patch/:selectedPatch', addChanges)
