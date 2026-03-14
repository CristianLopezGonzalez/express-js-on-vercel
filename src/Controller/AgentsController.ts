import {Request, Response} from 'express';
import {db} from "../db/index.js";
import {agents} from "../db/schema.js";

class AgentsController {
    static async getAllAgents(req: Request, res: Response) {
        try {

            const allAgents = await db.query.agents.findMany({
                with: {
                    abilities: true,
                    role: true,
                }
            });

            if (allAgents.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No agents found'
                })
            }

            return res.status(200).json({
                success: true,
                data: allAgents
            })

        } catch (e) {
            const error = e as Error;
            res.status(500).send({
                success: false,
                message: `Internal Server Error ${error.message}`,
            })
        }
    }

    static async crateAgent(req: Request, res: Response) {
        try {

            const body = Array.isArray(req.body) ? req.body : [req.body];

            for (const agent of body) {
                if (!agent.agentName || !agent.description || !agent.agentNumber || !agent.race) {
                    return res.status(400).send({
                        success: false,
                        message: "Missing fields for agents",
                    })
                }
            }

            const newAgents = await db.insert(agents).values(body).returning();

            return res.status(201).json({
                success: true,
                data: newAgents
            })

        } catch (e: any) {
            if (e.cause?.code === "23505") {
                return res.status(409).json({
                    success: false,
                    message: "Agent already exists",
                })
            }
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${e.cause?.message}`,
            })
        }
    }
}

export default AgentsController
