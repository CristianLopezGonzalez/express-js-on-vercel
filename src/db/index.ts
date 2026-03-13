// src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

const client = postgres(process.env.DATABASE_URL!, {
    max: 1,
    ssl: "require",
});

export const db = drizzle(client, { schema });