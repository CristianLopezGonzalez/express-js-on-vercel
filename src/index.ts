import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'

import MapsRoutes from "./Routes/MapsRoutes.js";
import WeaponRoutes from "./Routes/WeaponRoutes.js"
import RolesRouter from "./Routes/RolesRouter.js";
import AgentsRouter from "./Routes/AgentsRouter.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static(path.join(__dirname, '../public/images')))

app.use('/api/valorant/maps', MapsRoutes)
app.use('/api/valorant/weapons', WeaponRoutes)
app.use('/api/valorant/roles', RolesRouter)
app.use('/api/valorant/agents', AgentsRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to my API'
    })
})

export default app