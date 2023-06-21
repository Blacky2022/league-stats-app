import express, { urlencoded, static as eStatic } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { homeRouter } from './routes/home'
import { performanceRouter } from './routes/performance'
import { userRouter } from './routes/user'
import { worldsRouter } from './routes/worlds'
import { seasonRouter } from './routes/season'
import mongoose from './utils/db'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

app.use(express.json())
app.use(bodyParser.json())
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)
app.use(cookieParser())
app.use('/', homeRouter)
app.use('/performance', performanceRouter)
app.use('/user', userRouter)
app.use('/worlds', worldsRouter)
app.use('/season', seasonRouter)

if (mongoose.connection.readyState === 1) {
	console.log('Jesteś już połączony z bazą danych.')
} else {
	console.log('Nie jesteś jeszcze połączony z bazą danych.')
}

app.listen(3001, '0.0.0.0', (): void => {
	console.log('Tobiasz Latocha podsluchuje na : http://localhost:3001')
})
