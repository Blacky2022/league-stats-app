import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose
	.connect(`${process.env.dbUrl}/${process.env.dbName}`)
	.then(() => {
		console.log('Połączono z bazą danych.')
	})
	.catch(err => {
		console.error('Błąd połączenia z bazą danych:', err)
	})

export default mongoose
