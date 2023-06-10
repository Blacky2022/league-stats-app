import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import userModel, { UserDocument } from '../models/user.model'

interface CustomRequest extends Request {
	user?: UserDocument
}

interface TokenDecoded {
	data: string
}

const tokenDecode = (req: Request): TokenDecoded | false => {
	try {
		console.log("headers:", req.headers )
		const bearerHeader = req.headers['authorization']

		if (bearerHeader) {
			const token = bearerHeader.split(' ')[1]

			return jwt.verify(token, process.env.TOKEN_SECRET) as TokenDecoded
		}

		return false
	} catch {
		return false
	}
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
	const body = req.body

	const tokenDecoded = tokenDecode(req)
	if (!tokenDecoded) throw new Error('Brak autoryzacji.')

	const user: UserDocument | null = await userModel.findById(tokenDecoded.data)

	if (!user) throw new Error('Nieprawidłowy użytkownik.')

	req.user = user

	next()
}

export default { auth, tokenDecode }
