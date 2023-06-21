import mongoose from 'mongoose'
import { createChampionPerformanceModel } from '../models/ranked_champion.model';
import { createChangesModel } from '../models/champion_changes';
import { WorldsChampionModel } from '../models/worlds_champion.model';

/* 
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
*/
async function clearDatabase() {
try {

    // Czyszczenie kolekcji champion_changes_X
    for (let i = 1; i <= 23; i++) {
      const collectionName = `champion_changes_${i}`;
      const ChampionChangesModel = createChangesModel(i);
      await ChampionChangesModel.deleteMany({});
      console.log(`Wyczyszczono kolekcję ${collectionName}`);
    }

    // Czyszczenie kolekcji champion_performance_12_X
    for (let i = 1; i <= 23; i++) {
      const collectionName = `champion_performance_12_${i}`;
      const ChampionPerformanceModel = createChampionPerformanceModel(i);
      await ChampionPerformanceModel.deleteMany({});
      console.log(`Wyczyszczono kolekcję ${collectionName}`);
    }

    // Czyszczenie kolekcji worldschampions
    await WorldsChampionModel.deleteMany({});
    console.log('Wyczyszczono kolekcję worldschampions');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Błąd podczas czyszczenia kolekcji:', error);
  }
}
export default clearDatabase