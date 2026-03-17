import {marathonDb as db} from "../../db/index.js"
import {Request, Response} from "express"
import {consumables} from "../../db/schemas/Marathon.js"

class ConsumableController {
    static async getAllConsumables(req: Request, res: Response) {
        try {
            const data = await db.query.consumables.findMany()

            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No consumables found."
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

    static async createConsumables(req: Request, res: Response) {
        try {
            const body = Array.isArray(req.body) ? req.body : [req.body]

            for (const consumable of body) {
                if (!consumable.name || !consumable.description || !consumable.icon || !consumable.category) {
                    return res.status(400).json({
                        success: false,
                        message: "Missing fields for consumable"
                    })
                }
            }

            const newConsumables = await db.insert(consumables).values(body).returning()
            res.status(201).json({
                success: true,
                data: newConsumables
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

export default ConsumableController