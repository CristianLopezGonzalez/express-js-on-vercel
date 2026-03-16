import {Response, Request} from "express";
import { valorantDb as db } from "../../db/index.js"
import {weapons} from "../../db/schemas/Valorant.js"

class WeaponController {

    static async getAllWeapons(req: Request, res: Response) {

        try {

            const allWeapons = await db.select().from(weapons);

            if (allWeapons.length === 0) {
                res.status(400).json({
                    success: false,
                    message: "No weapons found."
                })
            }

            res.status(200).json({
                success: true,
                data: allWeapons
            })

        } catch (e) {
            const error = e as Error;

            res.status(500).json({
                success: false,
                message: "Internal server error " + error.message,
            })
        }

    }

    static async createWeapons(req: Request, res: Response) {

        try {

            const body = Array.isArray(req.body) ? req.body : [req.body];

            for (const weapon of body) {
                if (!weapon.icon || !weapon.weaponName || !weapon.description) {
                    return res.status(400).json({
                        success: false,
                        error: "Missing fields for weapon"
                    })
                }
            }

            const addWeapon = await db.insert(weapons).values(body).returning();
            res.status(200).json({
                success: true,
                data: addWeapon
            })

        } catch (e) {
            const error = e as Error;
            res.status(500).json({
                success: false,
                message: "Internal server error " + error.message,
            })
        }

    }
}

export default WeaponController;