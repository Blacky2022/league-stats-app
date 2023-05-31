import mongoose, { Schema, Document, Model } from 'mongoose'

interface IChampionPerformance extends Document {
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

const ChampionPerformanceSchema: Schema<IChampionPerformance, IChampionPerformanceModel> = new Schema({
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

function getCollectionName(patchNumber: number): string {
	return `champions_performance_12_${patchNumber}`
}

export const ChampionPerformanceModel = mongoose.model<IChampionPerformance, IChampionPerformanceModel>(
	'ChampionPerformance',
	ChampionPerformanceSchema
)
