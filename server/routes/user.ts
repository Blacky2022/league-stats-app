import { Request, Response, Router } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import userModel, { UserDocument } from '../models/user.model'
import { body } from 'express-validator'
import tokenMiddleware from '../middlewares/token.middleware'

export const userRouter = Router()
//controller odpowiedzialny za funkcje ścieżki user.
interface CustomRequest extends Request {
	user?: UserDocument
}
userRouter
	.post(
		'/signup',
		body('username')
			.exists()
			.withMessage('username is required')
			.isLength({ min: 8 })
			.withMessage('username minimum 8 characters')
			.custom(async value => {
				const user = await userModel.findOne({ username: value })
				if (user) return Promise.reject('username already used')
			}),
		body('password')
			.exists()
			.withMessage('password is required')
			.isLength({ min: 8 })
			.withMessage('password minimum 8 characters'),
		body('confirmPassword')
			.exists()
			.withMessage('confirmPassword is required')
			.isLength({ min: 8 })
			.withMessage('confirmPassword minimum 8 characters')
			.custom((value, { req }) => {
				if (value !== req.body.password) throw new Error('confirmPassword not match')
				return true
			}),
		async (req: Request, res: Response): Promise<void> => {
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
		}
	)
	.post(
		'/signin',
		body('username')
			.exists()
			.withMessage('username is required')
			.isLength({ min: 8 })
			.withMessage('username minimum 8 characters'),
		body('password')
			.exists()
			.withMessage('password is required')
			.isLength({ min: 8 })
			.withMessage('password minimum 8 characters'),
		async (req: Request, res: Response): Promise<void> => {
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
		}
	)
	.put('/updatePassword', tokenMiddleware.auth,
    body("password")
        .exists().withMessage("password is required")
        .isLength({ min: 8 }).withMessage("password minimum 8 characters"),
    body("newPassword")
        .exists().withMessage("newPassword is required")
        .isLength({ min: 8 }).withMessage("newPassword minimum 8 characters"),
    body("confirmNewPassword")
        .exists().withMessage("confirmNewPassword is required")
        .isLength({ min: 8 }).withMessage("confirmNewPassword minimum 8 characters")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) throw new Error("confirmNewPassword not match");
            return true;
        }), async (req: CustomRequest, res: Response): Promise<void> => {
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
