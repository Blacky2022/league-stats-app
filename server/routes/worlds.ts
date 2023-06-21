import { Router } from 'express'
import { getChampions } from '../controllers/worlds.controller'

export const worldsRouter = Router()

worldsRouter.get('/champions', getChampions)
