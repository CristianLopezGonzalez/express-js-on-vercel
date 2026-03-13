import {Request, Response} from 'express';
import {db} from "../db/index.js";
import {agents} from "../db/schema.js";

class AgentsController {
    static async getAllAgents(req: Request, res: Response) {
        try {

            const allAgents = await db.select().from(agents)

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

            for (const agent of body){
                if (!agent.agentName || !agent.description  || !agent.agentNumber || !agent.race){
                    return res.status(400).send({
                        success: false,
                        message: "Missing fields for agents",
                    })
                }
            }

        }catch (e){
            const error = e as Error;
            res.status(500).send({
                success: false,
                message: `Internal Server Error ${error.message}`,
            })
        }
    }
}

export default AgentsController
