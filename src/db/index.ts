import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as valorantSchema from "./schemas/Valorant.js"
import * as marathonSchema from "./schemas/Marathon.js"

const client = postgres(process.env.DATABASE_URL!, {
    max: 1,
    ssl: "require",
})

export const valorantDb = drizzle(client, { schema: valorantSchema })
export const marathonDb = drizzle(client, { schema: marathonSchema })