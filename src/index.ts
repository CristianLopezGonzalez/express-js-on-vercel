import express from 'express'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url'

// Valorant routes
import MapsRoutes from "./Routes/valorant/MapsRoutes.js";
import WeaponRoutes from "./Routes/valorant/WeaponRoutes.js"
import RolesRouter from "./Routes/valorant/RolesRouter.js";
import AgentsRouter from "./Routes/valorant/AgentsRouter.js"
import AbilitiesRoutes from "./Routes/valorant/AbilitiesRoutes.js";

// Marathon routes

import RunnerRouter from "./Routes/marathon/RunnerRouter.js";
import WeaponRouter from "./Routes/marathon/WeaponRouter.js";
import FactionRouter from "./Routes/marathon/FactionRouter.js";
import AbilityRouter from "./Routes/marathon/AbilityRouter.js";
import MapRouter from "./Routes/marathon/MapRouter.js";
import LootRouter from "./Routes/marathon/LootRouter.js";
import ConsumableRouter from "./Routes/marathon/ConsumableRouter.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors({
    origin: [
        'http://localhost:5173',
        /\.vercel\.app$/
    ]
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static(path.join(__dirname, '../public/images')))

app.use('/api/valorant/maps', MapsRoutes)
app.use('/api/valorant/weapons', WeaponRoutes)
app.use('/api/valorant/roles', RolesRouter)
app.use('/api/valorant/agents', AgentsRouter)
app.use('/api/valorant/abilities', AbilitiesRoutes)

app.use('/api/marathon/runners', RunnerRouter)
app.use('/api/marathon/weapons', WeaponRouter)
app.use('/api/marathon/factions', FactionRouter)
app.use('/api/marathon/abilities', AbilityRouter)
app.use('/api/marathon/maps', MapRouter)
app.use('/api/marathon/loot', LootRouter)
app.use('/api/marathon/consumables', ConsumableRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to my API'
    })
})

export default app