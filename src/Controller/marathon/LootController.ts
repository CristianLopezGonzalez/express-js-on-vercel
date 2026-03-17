import {marathonDb as db} from "../../db/index.js"
import {Request, Response} from "express"
import {loot} from "../../db/schemas/Marathon.js"

class LootController {
    static async getAllLoot(req: Request, res: Response) {
        try {
            const data = await db.query.loot.findMany()

            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No loot found."
                })
            }

            res.status(200).json({
                success: true,
                data: data
            })
        } catch (e) {
            const error = e as Error
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${error.message}`
            })
        }
    }

    static async createLoot(req: Request, res: Response) {
        try {
            const body = Array.isArray(req.body) ? req.body : [req.body]

            for (const item of body) {
                if (!item.name || !item.description || !item.icon || !item.rarity) {
                    return res.status(400).json({
                        success: false,
                        message: "Missing fields for loot"
                    })
                }
            }

            const newLoot = await db.insert(loot).values(body).returning()
            res.status(201).json({
                success: true,
                data: newLoot
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

export default LootController