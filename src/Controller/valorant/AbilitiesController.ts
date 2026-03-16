import {Request, Response} from 'express';
import { valorantDb as db } from "../../db/index.js"
import {abilities} from "../../db/schemas/Valorant.js";

class AbilitiesController {

    static async getAllAbilities(req: Request, res: Response) {
        try {
            const allAbilities = await db.query.abilities.findMany({
                with: {
                    agent: true,
                }
            });

            if (allAbilities.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No abilities found'
                })
            }

            return res.status(200).json({
                success: true,
                data: allAbilities
            })

        } catch (e) {
            const error = e as Error;
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${error.message}`,
            })
        }
    }

    static async createAbility(req: Request, res: Response) {
        try {
            const body = Array.isArray(req.body) ? req.body : [req.body];

            for (const ability of body) {
                if (!ability.abilityName || !ability.description || !ability.icon || !ability.agentId) {
                    return res.status(400).json({
                        success: false,
                        message: "Missing fields for ability",
                    })
                }
            }

            const newAbilities = await db.insert(abilities).values(body).returning();

            return res.status(201).json({
                success: true,
                data: newAbilities
            })

        } catch (e: any) {
            if (e.cause?.code === "23503") {
                return res.status(404).json({
                    success: false,
                    message: "Agent not found",
                })
            }
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${e.message}`,
            })
        }
    }
}

export default AbilitiesController;