import mongoose from 'mongoose'

async function clearDatabase() {
	try {
		const collections = mongoose.connection.collections

		for (const key in collections) {
			if (key !== 'users') {
				const collection = collections[key]
				await collection.deleteMany()
				console.log(`Collection ${collection.collectionName} cleared.`)
			}
		}

		console.log('Baza danych wyczyszczona.')
	} catch (error) {
		console.error('Błąd podczas czyszczenia bazy danych:', error)
	}
}

export default clearDatabase
