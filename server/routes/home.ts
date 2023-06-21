import { Router } from 'express'
import { clearData, getHomeData, importCSV, importJSON, importXML } from '../controllers/home.conntroller'

export const homeRouter = Router()

homeRouter
	.get('/', getHomeData)
	.post('/importCSV', importCSV)
	.post('/importXML', importXML)
	.post('/importJSON', importJSON)
	.get('/cleardata', clearData)
