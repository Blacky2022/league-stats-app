import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IChampionPerformance extends Document {
	_id: Types.ObjectId
	Name: string
	Class: string
	Role: string
	Tier: string
	Score: number
	Trend: string
	Win: number
	Pick: number
	Ban: number
	KDA: number
}

interface IChampionPerformanceModel extends Model<IChampionPerformance> {}

export const ChampionPerformanceSchema: Schema<IChampionPerformance, IChampionPerformanceModel> = new Schema({
	_id: mongoose.Types.ObjectId,
	Name: { type: String, required: true },
	Class: { type: String, required: true },
	Role: { type: String, required: true },
	Tier: { type: String, required: true },
	Score: { type: Number, required: true },
	Trend: { type: String, required: true },
	Win: { type: Number, required: true },
	Pick: { type: Number, required: true },
	Ban: { type: Number, required: true },
	KDA: { type: Number, required: true },
})

export function createChampionPerformanceModel(patchNumber: number): Model<IChampionPerformance> {
	const collectionName = `champion_performance_12_${patchNumber}`

	// Sprawdź, czy model już istnieje
	if (mongoose.models[collectionName]) {
		return mongoose.models[collectionName] as Model<IChampionPerformance>
	}

	const ChampionPerformanceModel = mongoose.model<IChampionPerformance, IChampionPerformanceModel>(
		`ChampionPerformance_12_${patchNumber}`,
		ChampionPerformanceSchema,
		collectionName
	)

	return ChampionPerformanceModel
}
