import express, { urlencoded, static as eStatic } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { homeRouter } from './routes/home'
import { performanceRouter } from './routes/performance'
import { userRouter } from './routes/user'
import { worldsRouter } from './routes/worlds'
import { seasonRouter } from './routes/season'
import { handleError } from './utils/error'
import mongoose from './utils/db'
// import { handleError } from './utils/errors'
// import { homeRouter } from './routers/home'
// import { childRouter } from './routers/child'
// import { giftRouter } from './routers/gift'
//require('./utils/db')
const app = express()

app.use(express.json()) // Content-type: application/json
app.use(
	cors({
		origin: `http://localhost:3000`,
	})
)
app.use('/', homeRouter)
app.use('/performance', performanceRouter)
app.use('/user', userRouter)
app.use('/worlds', worldsRouter)
app.use('/season', seasonRouter)
app.use(handleError)

if (mongoose.connection.readyState === 1) {
	console.log('Jesteś już połączony z bazą danych.');
  } else {
	console.log('Nie jesteś jeszcze połączony z bazą danych.');
  }
  
app.listen(3001, '0.0.0.0', (): void => {
	console.log('Listening on http://localhost:3001')
})
function Static(arg0: string): any {
	throw new Error('Function not implemented.')
}

