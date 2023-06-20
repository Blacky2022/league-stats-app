import mongoose, { Document, Model, Schema } from 'mongoose'
import { modelOptions } from './models.options'

export interface UserDocument extends Document {
	username: string
	password: string
	canEdit: boolean
}

export interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		canEdit: {
			type: Boolean,
			required: true,
		},
	},
	modelOptions
)

const userModel: UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema)

export default userModel
