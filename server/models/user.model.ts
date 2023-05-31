import mongoose, { Document, Model, Schema } from 'mongoose'
import { modelOptions } from './models.options'
import crypto from 'crypto'

export interface UserDocument extends Document {
	username: string
	password: string
	salt: string
	setPassword(password: string): void
	validPassword(password: string): boolean
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
		salt: {
			type: String,
			required: true,
			select: false,
		},
	},
	modelOptions
)

userSchema.methods.setPassword = function (password: string) {
	this.salt = crypto.randomBytes(16).toString('hex')
	this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

userSchema.methods.validPassword = function (password: string) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')

	return this.password === hash
}

const userModel: UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema)

export default userModel
