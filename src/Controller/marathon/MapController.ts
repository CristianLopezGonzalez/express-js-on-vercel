import { marathonDb as db } from "../../db/index.js"
import { Request, Response } from "express"
import { maps } from "../../db/schemas/Marathon.js"

class MapController {
    static async getAllMaps(req: Request, res: Response) {
        try {
            const data = await db.query.maps.findMany()

            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No maps found."
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

    static async createMaps(req: Request, res: Response) {
        try {
            const body = Array.isArray(req.body) ? req.body : [req.body]

            for (const map of body) {
                if (!map.mapName || !map.description || !map.icon1 || !map.icon2) {
                    return res.status(400).json({
                        success: false,
                        message: "Missing fields for map"
                    })
                }
            }

            const newMaps = await db.insert(maps).values(body).returning()
            res.status(201).json({
                success: true,
                data: newMaps })
        } catch (e) {
            const error = e as Error
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${error.message}`
            })
        }
    }
}

export default MapController