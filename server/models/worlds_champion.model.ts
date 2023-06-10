import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IWorldsChampion extends Document {
	champion: string
	sum_total: number
	win_total: number
	sum_bans: number
	sum_pick_ban: number
}

interface IWorldsChampionModel extends Model<IWorldsChampion> {}

const WorldsChampionSchema: Schema<IWorldsChampion, IWorldsChampionModel> = new Schema({
	champion: { type: String, required: true },
	sum_total: { type: Number, required: true },
	win_total: { type: Number, required: true },
	sum_bans: { type: Number, required: true },
	sum_pick_ban: { type: Number, required: true },
})

export const WorldsChampionModel = mongoose.model<IWorldsChampion, IWorldsChampionModel>(
	'WorldsChampion',
	WorldsChampionSchema
)
