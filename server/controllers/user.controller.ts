import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../models/user.model'

export const signup = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password, canEdit } = req.body

		const checkUser = await userModel.findOne({ username })
		if (checkUser) {
			res.status(400).json({ error: 'User already exists.' })
			return
		}

		const hashPassword = await bcrypt.hash(password, 10)
		const user = new userModel({ username, password: hashPassword, canEdit })
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
		res.cookie('username', username, {
			httpOnly: true,
		})

		res.json({
			message: 'User successfully registered and logged in.',
		})
	} catch (err) {
		console.error('Error during signup:', err)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

export const signin = async (req: Request, res: Response): Promise<void> => {
	const { username, password } = req.body

	try {
		const user = await userModel.findOne({ username })
		if (!user) {
			res.status(400).json({ error: 'User does not exist.' })
			return
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			res.status(400).json({ error: 'Invalid password.' })
			return
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
		res.cookie('username', username, {
			httpOnly: true,
		})
		res.json({
			message: 'Logged in!',
			id: user.id,
		})
	} catch (err) {
		console.error('Error during signin:', err)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

export const logout = async (req: Request, res: Response): Promise<void> => {
	try {
		res.clearCookie('token')
		res.clearCookie('username')
		res.json({ status: true })
	} catch (err) {
		console.error('Error during logout:', err)
		res.status(500).json({ error: 'Internal server error.' })
	}
}

export const authenticate = async (req: Request, res: Response): Promise<void> => {
	res.json({ status: true })
}

export const protectedEndpoint = async (req: Request, res: Response): Promise<void> => {
	const username = req.cookies.username

	try {
		const user = await userModel.findOne({ username })
		if (!user) {
			res.status(401).json({ error: 'Unauthorized.' })
			return
		}

		if (!user.canEdit) {
			res.status(403).json({ error: 'Forbidden.' })
			return
		}

		res.json({ status: true })
	} catch (err) {
		console.error('Error in protectedEndpoint:', err)
		res.status(500).json({ error: 'Internal server error.' })
	}
}
