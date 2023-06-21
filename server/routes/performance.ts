import { Router } from 'express'
import { getChampionChanges, getChampionStats } from '../controllers/performance.controller'

export const performanceRouter = Router()

performanceRouter
	.get('/:name/stats/:selectedPatch', getChampionStats)
	.get('/:name/patch/:selectedPatch', getChampionChanges)
