import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose
	.connect(`${process.env.DATABASE_HOST}`)
	//.connect(`mongodb://localhost:27017/league_stats_app`)
	.then(() => {
		console.log('Połączono z bazą danych.')
	})
	.catch(err => {
		console.error('Błąd połączenia z bazą danych:', err)
	})

export default mongoose
