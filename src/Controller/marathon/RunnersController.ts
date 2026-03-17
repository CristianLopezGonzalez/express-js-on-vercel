import {marathonDb as db} from "../../db/index.js"
import {Request, Response} from "express";
import {runners} from "../../db/schemas/Marathon.js";

class RunnerController {
    static async getAllRunners(req: Request, res: Response) {

        try {

            const runners = await db.query.runners.findMany({
                with: {
                    abilities: true
                }
            })

            if (runners.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "No runners found."
                })
            }

            res.status(200).json({
                success: true,
                data: runners
            })

        } catch (e) {
            const error = e as Error;
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${error.message}`,
            })
        }

    }

    static async createRunners(req: Request, res: Response) {

        try {

            const body = Array.isArray(req.body) ? req.body : [req.body];

            for (const runner of body) {
                if (!runner.runnerName || !runner.description || !runner.Model || !runner.icon) {
                    res.status(400).json({
                        success: false,
                        message: `Missing fields for runner"`,
                    })
                }
            }

            const newRunner = await db.insert(runners).values(body).returning()
            return res.status(201).json({
                success: true,
                data: newRunner
            })

        } catch (e) {
            const error = e as Error;
            res.status(500).json({
                success: false,
                message: `Internal Server Error ${error.message}`,
            })
        }
    }
}

export default RunnerController;