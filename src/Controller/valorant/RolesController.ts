import {Response, Request} from "express";
import { valorantDb as db } from "../../db/index.js"
import {roles} from "../../db/schemas/Valorant.js"
import { eq } from 'drizzle-orm'

class RolesController {

    static async getRoles(req: Request, res: Response) {

        try {

            const allRoles = await db.select().from(roles);

            if (allRoles.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "No roles found",
                })
            }

            return res.status(200).json({
                success: true,
                data: allRoles,
            })

        } catch (e) {
            const error = e as Error;
            res.status(500).send({
                success: false,
                message: 'Internal server error ' + error.message
            })
        }

    }

    static async createRoles(req: Request, res: Response) {
        try {

            const body = Array.isArray(req.body) ? req.body : [req.body];

            for (const role of body) {
                if (!role.roleName || !role.description || !role.icon) {
                    res.status(400).send({
                        success: false,
                        message: "Missing fields for role",
                    })
                }
            }

            const createRole = await db.insert(roles).values(req.body).returning()

            return res.status(201).json({
                success: true,
                data: createRole
            })

        } catch (e) {
            const error = e as Error;
            res.status(500).send({
                success: false,
                message: 'Internal server error ' + error.message
            })
        }
    }
static async getRoleById(req: Request, res: Response) {
    try {
        const { id } = req.params

        const role = await db.select().from(roles).where(eq(roles.roleId, Number(id)))

        if (!role.length) {
            return res.status(404).json({ success: false, message: 'Role not found' })
        }

        res.json(role[0])
    } catch (e) {
        const error = e as Error
        res.status(500).json({
            success: false,
            message: 'Internal server error ' + error.message
        })
    }
}

}

export default RolesController;