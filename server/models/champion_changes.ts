import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IChampionChanges extends Document {
	bohater: string
	opis: string
	czy_buff: boolean
}

interface IChampionChangesModel extends Model<IChampionChanges> {}

export const ChampionChangesSchema: Schema<IChampionChanges, IChampionChangesModel> = new Schema({
	bohater: { type: String, required: true },
	opis: { type: String, required: true },
	czy_buff: { type: Boolean, required: true },
})

export function createChangesModel(patchNumber: number): Model<IChampionChanges> {
	const collectionName = `champion_changes_${patchNumber}`

	// Sprawdź, czy model już istnieje
	if (mongoose.models[collectionName]) {
		return mongoose.models[collectionName] as Model<IChampionChanges>
	}

	const ChampionChangesModel = mongoose.model<IChampionChanges, IChampionChangesModel>(
		`ChampionChanges_${patchNumber}`,
		ChampionChangesSchema,
		collectionName
	)

	return ChampionChangesModel
}
