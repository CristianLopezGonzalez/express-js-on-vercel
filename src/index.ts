import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import MapsRoutes from "./Routes/MapsRoutes.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/valorant/maps', MapsRoutes)

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to my API'
  })
})

export default app