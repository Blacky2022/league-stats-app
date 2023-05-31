interface ModelOptions {
	toJSON: {
		virtuals: boolean
		transform: (doc: any, obj: any) => any
	}
	toObject: {
		virtuals: boolean
		transform: (doc: any, obj: any) => any
	}
	versionKey: boolean
	timestamps: boolean
}

export const modelOptions: ModelOptions = {
	toJSON: {
		virtuals: true,
		transform: (_, obj) => {
			delete obj._id
			return obj
		},
	},
	toObject: {
		virtuals: true,
		transform: (_, obj) => {
			delete obj._id
			return obj
		},
	},
	versionKey: false,
	timestamps: false,
}
