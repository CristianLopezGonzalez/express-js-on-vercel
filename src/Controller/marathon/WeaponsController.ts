import { marathonDb as db } from "../../db/index.js"
import { Request, Response } from "express"
import { weapons } from "../../db/schemas/Marathon.js"

class WeaponController {
    static async getAllWeapons(req: Request, res: Response) {
        try {
            const data = await db.query.weapons.findMany()

            if (data.length === 0) {
                return res.status(404).json({ success: false, message: "No weapons found." })
            }

            res.status(200).json({ success: true, data })
        } catch (e) {
            const error = e as Error
            res.status(500).json({ success: false, message: `Internal Server Error ${error.message}` })
        }
    }

    static async createWeapons(req: Request, res: Response) {
        try {
            const body = Array.isArray(req.body) ? req.body : [req.body]

            for (const weapon of body) {
                if (!weapon.weaponName || !weapon.description || !weapon.icon) {
                    return res.status(400).json({ success: false, message: "Missing fields for weapon" })
                }
            }

            const newWeapons = await db.insert(weapons).values(body).returning()
            res.status(201).json({ success: true, data: newWeapons })
        } catch (e) {
            const error = e as Error
            res.status(500).json({ success: false, message: `Internal Server Error ${error.message}` })
        }
    }
}

export default WeaponController