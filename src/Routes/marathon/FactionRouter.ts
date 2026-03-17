import express from "express"
import FactionController from "../../Controller/marathon/FactionController.js";
import { requireApiKey } from "../../Middleware/Auth.js"

const router = express.Router()

router.get("/", FactionController.getAllFactions)
router.post("/", requireApiKey, FactionController.createFactions)

export default router