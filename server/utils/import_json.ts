import fs from 'fs'
import mongoose from 'mongoose'

export async function importDataJSON() {
	try {
		const db = mongoose.connection

		for (let patchNumber = 1; patchNumber <= 23; patchNumber++) {
			const filePath = `./data/aktualizacje/patch_${patchNumber}.json`
			const collectionName = `champion_changes_${patchNumber}`

			const rawData = fs.readFileSync(filePath, 'utf-8')
			const jsonData = JSON.parse(rawData).zmiany_postaci

			try {
				// Usuń rekordy z kolekcji, jeśli już istnieją
				await db.collection(collectionName).deleteMany({})

				// Przetwarzaj każdy obiekt osobno i importuj do kolekcji
				for (const obj of jsonData) {
					let { bohater, opis, czy_buff } = obj

					// Zamień wszystkie litery na małe
					bohater = bohater.toLowerCase()

					// Powiększ pierwszą literę
					bohater = bohater.charAt(0).toUpperCase() + bohater.slice(1)

					await db.collection(collectionName).insertOne({ bohater, opis, czy_buff })
				}

				console.log(`Data from ${filePath} imported to ${collectionName}`)
			} catch (error) {
				console.error(`Error importing data from ${filePath} to ${collectionName}:`, error)
			}
		}

		console.log('JSON files imported successfully!')
	} catch (error) {
		console.error('Error importing JSON files:', error)
	}
}
