import { Request, Response } from 'express'
import { importDataCSV } from '../utils/import_csv'
import clearDatabase from '../utils/clear_db'
import { importDataJSON } from '../utils/import_json'
import { importDataXML } from '../utils/import_xml'

export const getHomeData = (req: Request, res: Response): void => {
	res.json({
		message: 'Connection works',
	})
}

export const importCSV = async (req: Request, res: Response): Promise<void> => {
	try {
		await importDataCSV()
		res.json({ message: 'Data has been imported into the database.' })
	} catch (error) {
		console.error('Error importing data:', error)
		res.status(500).json({ error: 'Failed to import data into the database.' })
	}
}

export const importXML = async (req: Request, res: Response): Promise<void> => {
	try {
		await importDataXML()
		res.json({ message: 'Data has been imported into the database.' })
	} catch (error) {
		console.error('Error importing data:', error)
		res.status(500).json({ error: 'Failed to import data into the database.' })
	}
}

export const importJSON = async (req: Request, res: Response): Promise<void> => {
	try {
		await importDataJSON()
		res.json({ message: 'Data has been imported into the database.' })
	} catch (error) {
		console.error('Error importing data:', error)
		res.status(500).json({ error: 'Failed to import data into the database.' })
	}
}

export const clearData = (req: Request, res: Response): void => {
	clearDatabase()
		.then(() => {
			res.json({ message: 'Database cleared successfully' })
		})
		.catch(error => {
			res.status(500).json({ error: 'Failed to clear the database' })
		})
}
