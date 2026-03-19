import { marathonDb as db } from "../../db/index.js"
import { Request, Response } from "express"
import { abilities } from "../../db/schemas/Marathon.js"

class AbilityController {
    static async getAllAbilities(req: Request, res: Response) {
        try {
            const data = await db.query.abilities.findMany({
                with: { runner: true }
            })

            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No abilities found."
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

    static async createAbilities(req: Request, res: Response) {
        try {
            const body = Array.isArray(req.body) ? req.body : [req.body]

            for (const ability of body) {
                if (!ability.abilityName || !ability.description || !ability.type || !ability.icon || !ability.runnerId) {
                    return res.status(400).json({
                        success: false,
                        message: "Missing fields for ability"
                    })
                }
            }

            // Map camelCase (JSON) -> snake_case (Drizzle column names)
            const mapped = body.map((ability: {
                abilityName: string
                description: string
                type: "Prime" | "Tactical" | "Passive"
                icon: string
                runnerId: number
            }) => ({
                abilityName: ability.abilityName,
                description: ability.description,
                type: ability.type,
                icon: ability.icon,
                runnerId: ability.runnerId,
            }))

            const newAbilities = await db.insert(abilities).values(mapped).returning()
            res.status(201).json({
                success: true,
                data: newAbilities
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

export default AbilityController