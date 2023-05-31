import fs from 'fs'
import csvParser from 'csv-parser'
import mongoose from 'mongoose'
import { ChampionPerformanceModel } from '../models/ranked_champion.model'

export async function importData() {
	try {
		const db = mongoose.connection

		for (let i = 0; i < 2; i++) {
			const patchNumber = i + 1
			const filePath = `./data/dane z sezonu/League of Legends Champion Stats 12.${patchNumber}.csv`
			const collectionName = `champion_performance_12_${patchNumber}`
			const collection = db.collection(collectionName)

			const stream = fs.createReadStream(filePath).pipe(csvParser({ separator: ';' }))

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

/*
export async function importData() {
	for (let patchNumber = 1; patchNumber <= 2; patchNumber++) {
		const collectionName = `champions_performance_${patchNumber}`
		const filePath = `./data/dane z sezonu/League of Legends Champion Stats 12.${patchNumber}.csv`

		if (!fs.existsSync(filePath)) {
			console.error(`Plik ${filePath} nie istnieje. Pomijanie importowania danych.`)
			continue
		}

		fs.createReadStream(filePath)
			.pipe(csvParser())
			.on('data', async data => {
				try {
					const championPerformance = new ChampionPerformanceModel({
						Name: data.Name,
						Class: data.Class,
						Role: data.Role,
						Tier: data.Tier,
						Score: parseFloat(data.Score),
						Trend: parseFloat(data.Trend),
						Win: parseFloat(data.Win),
						Pick: parseFloat(data.Pick),
						Ban: parseFloat(data.Ban),
						KDA: parseFloat(data.KDA),
					})

					await championPerformance.save()
				} catch (error) {
					console.error(`Błąd podczas tworzenia rekordu dla kolekcji ${collectionName}:`, error)
				}
			})
			.on('end', () => {
				console.log(`Importowanie danych dla kolekcji ${collectionName} zakończone.`)
			})
	}
}

// Wywołanie funkcji importującej dane
//importData().catch((error) => {
// console.error('Błąd importowania danych:', error);
//});
*/
