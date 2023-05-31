import { Request, Response, Router } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import userModel, { UserDocument } from '../models/user.model'

export const userRouter = Router()
//controller odpowiedzialny za funkcje ścieżki user.
interface CustomRequest extends Request {
	user?: UserDocument;
  }
userRouter
	.post('/signup', async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, password } = req.body
			const checkUser = await userModel.findOne({ username })

			if (checkUser) {
				throw new Error('Użytkownik już istnieje.')
			}

			const user = new userModel()
			user.username = username
			user.setPassword(password)

			await user.save()

			const token = jsonwebtoken.sign({ data: user.id }, process.env.TOKEN_SECRET, { expiresIn: '24h' })

			res.json({
				message: 'Użytkownik został pomyślnie zarejestrowany.',
				token,
			})
		} catch (error) {
			res.status(500).json({
				error: error.message,
			})
		}
	})
	.post('/signin', async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, password } = req.body

			const user = await userModel.findOne({ username }).select('username password salt id')

			if (!user) {
				throw new Error('Użytkownik nie istnieje.')
			}

			if (!user.validPassword(password)) {
				throw new Error('Nieprawidłowe hasło.')
			}

			const token = jsonwebtoken.sign({ data: user.id }, process.env.TOKEN_SECRET, { expiresIn: '24h' })

			user.password = undefined
			user.salt = undefined

			res.json({
				token,
				...user.toObject(),
				id: user.id,
			})
		} catch (error) {
			res.status(500).json({
				error: error.message,
			})
		}
		
	})
	.put('/updatePassword', async (req: CustomRequest, res: Response): Promise<void> => {
		try {
			const { password, newPassword } = req.body

			const user = await userModel.findById(req.user?.id).select('password id salt')

			if (!user) {
				throw new Error('Nieautoryzowany dostęp.')
			}

			if (!user.validPassword(password)) {
				throw new Error('Nieprawidłowe hasło.')
			}

			user.setPassword(newPassword)

			await user.save()

			res.status(200).json({
				message: 'Hasło zostało pomyślnie zaktualizowane.',
			})
		} catch (error) {
			res.status(500).json({
				error: error.message,
			})
		}
	})

