import { marathonDb as db } from "../../db/index.js"
import { Request, Response } from "express"
import { factions } from "../../db/schemas/Marathon.js"

class FactionController {
    static async getAllFactions(req: Request, res: Response) {
        try {
            const data = await db.query.factions.findMany()

            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No factions found."
                })
            }

            res.status(200).json({
                success: true,
                data:data
            })
        } catch (e) {
            const error = e as Error
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${error.message}`
            })
        }
    }

    static async createFactions(req: Request, res: Response) {
        try {
            const body = Array.isArray(req.body) ? req.body : [req.body]

            for (const faction of body) {
                if (!faction.factionName || !faction.description || !faction.role || !faction.icon) {
                    return res.status(400).json({
                        success: false,
                        message: "Missing fields for faction"
                    })
                }
            }

            const newFactions = await db.insert(factions).values(body).returning()
            res.status(201).json({
                success: true,
                data: newFactions
            })
        } catch (e) {
            const error = e as Error
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${error.message}`
            })
        }
    }
}

export default FactionController