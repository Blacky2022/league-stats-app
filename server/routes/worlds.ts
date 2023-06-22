import { Router } from 'express'
import { getCompare, getChampions } from '../controllers/worlds.controller'

export const worldsRouter = Router()

worldsRouter.get('/champions', getChampions)
            .get('/compare/:name/with/:comparedName', getCompare)
