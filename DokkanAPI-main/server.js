import express from 'express'
import cors from 'cors'
import characterRoutes from './routes/characterRoutes.js'
//CORS staat voor Cross-Origin Resource Sharing
const app = express()
const PORT = 3000
//geef de backend toestemming om data te delen met jouw frontend.
app.use(cors())
app.use(express.json())

// Alle routes voor karakters
app.use('/api/characters', characterRoutes)

// Start de server
app.listen(PORT, () => {
  console.log(`Backend server draait op http://localhost:${PORT}`)
})