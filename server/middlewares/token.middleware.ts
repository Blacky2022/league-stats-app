import process from 'node:process'
import jwt from 'jsonwebtoken'

export async function authenticateToken(req: any, res: any, next: any) {
	const token = req.cookies.token
	if (token === null || token === undefined) {
		return res.status(401).json({ status: false, msg: 'Unauthorized' })
	}
	try {
		const element = jwt.verify(token, process.env.TOKEN_SECRET)
		next()
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			res.status(401).json({ status: false, msg: 'Token expired' })
		} else {
			res.sendStatus(401)
		}
	}
}


