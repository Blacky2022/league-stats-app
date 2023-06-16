import mongoose from 'mongoose'

async function clearDatabase() {
	try {
		const collections = mongoose.connection.collections

		for (const collection of Object.values(collections)) {
			const collectionName = collection.collectionName

			if (collectionName !== 'users') {
				await collection.deleteMany()
			}
		}

		console.log('Wyczyszczono zawartość wszystkich kolekcji oprócz "users".')
	} catch (error) {
		console.error('Błąd podczas czyszczenia bazy danych:', error)
	}
}

export default clearDatabase
