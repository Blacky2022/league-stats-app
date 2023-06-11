import mongoose from 'mongoose';


// Adres i port bazy danych MongoDB
const dbURI = 'mongodb://localhost:27017/league_stats_app';



// Nawiązanie połączenia
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('Połączono z bazą danych.');
  })
  .catch((err) => {
    console.error('Błąd połączenia z bazą danych:', err);
  });

export default mongoose;
