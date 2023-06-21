import { Router } from 'express'
import {
	getChampionChanges,
	getChampionStats,
	getComparingChampionPatchNotes,
} from '../controllers/performance.controller'

export const performanceRouter = Router()

performanceRouter
	.get('/:name/stats/:selectedPatch', getChampionStats)
	.get('/:name/patch/:selectedPatch', getChampionChanges)
	.get('/:name/comparedwith/:comparedName/patches/:start/to/:end', getComparingChampionPatchNotes)
