import { Request, Response, Router, response } from 'express'
import jwt from 'jsonwebtoken'
import UserRecord from '../models/user.model'
import bcrypt from 'bcrypt'
import { authenticateToken } from '../middlewares/token.middleware'
import userModel from '../models/user.model'
export const userRouter = Router()
userRouter
	.post('/signup', async (req: Request, res: Response): Promise<void> => {
		try {
			const { username, password } = req.body
	
			const checkUser = await userModel.findOne({ username })
			if (checkUser) {
				throw new Error('Użytkownik już istnieje.')
			}
			const hashPassword = await bcrypt.hash(password, 10)
			const user = new UserRecord({ username, password: hashPassword })
			await user.save()

			const token = jwt.sign(
				{
					username: user.username,
				},
				process.env.TOKEN_SECRET,
				{
					expiresIn: '1d',
				}
			)

			res.cookie('token', token, {
				httpOnly: true,
			})

			res.json({
				message: 'Użytkownik został pomyślnie zarejestrowany i zalogowany.',
			})
		} catch (err) {
			console.log(err)
		}
	})

	.post('/signin', async (req: Request, res: Response): Promise<void> => {
		const { username, password } = req.body

		const user = await userModel.findOne({ username })

		if (!user) {
			throw new Error('Użytkownik nie istnieje.')
		}
	
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			throw new Error('Nieprawidłowe hasło.')
		}

		const token = jwt.sign(
			{
				username: user.username,
			},
			process.env.TOKEN_SECRET,
			{
				expiresIn: '1d',
			}
		)

		res.cookie('token', token, {
			httpOnly: true,
		})
		res.json({
			message: 'zalogowano!',
			id: user.id,
		})
	})
	.post('/logout', async (req: Request, res: Response): Promise<void> => {
		res.clearCookie('token')
		res.json({ status: true })
	})
	.post('/auth', authenticateToken, async (req: Request, res: Response): Promise<void> => {
		console.log(res)
		res.json({ status: true })
	})
