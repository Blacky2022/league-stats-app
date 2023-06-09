import fs from 'fs'
import csvParser from 'csv-parser'
import mongoose from 'mongoose'

export async function importDataCSV() {
	try {
		const db = mongoose.connection

		for (let i = 0; i < 23; i++) {
			const patchNumber = i + 1
			const filePath = `./data_to_import/dane z sezonu/League of Legends Champion Stats 12.${patchNumber}.csv`
			const collectionName = `champion_performance_12_${patchNumber}`
			const collection = db.collection(collectionName)

			const stream = fs.createReadStream(filePath).pipe(
				csvParser({
					separator: ';',
					mapValues: ({ value }) => value.trim(),
				})
			)

			for await (const row of stream) {
				await collection.insertOne(row)
			}

			console.log(`Data from ${filePath} imported to ${collectionName}`)
		}

		console.log('CSV files imported successfully!')
	} catch (error) {
		console.error('Error importing CSV files:', error)
	}
}
