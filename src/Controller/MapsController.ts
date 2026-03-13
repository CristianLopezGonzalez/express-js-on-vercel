import {Response,Request} from "express";
import { db } from "../db/index.js";
import { maps } from "../db/schema.js";

class MapsController {

    static async getAllMaps(req: Request, res: Response) {

        try {

            const allMaps = await db.select().from(maps)

            if (allMaps.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No maps found."
                })
            }

            res.status(200).json({
                success: true,
                data: allMaps,
            })

        }catch (e){
            const error = e as Error;
            res.status(500).json({
                success: false,
                message: "Internal server error " + error.message,
            })
        }

    }

    static async createMaps(req: Request, res: Response) {
        try {
            
        }catch (e) {
            const body = Array.isArray(req.body) ? req.body : [req.body];

            const addMaps = await db.insert(maps).values(body).returning();

            res.status(200).json({
                success: true,
                data: addMaps,
            })
        }
    }

}

export default MapsController;