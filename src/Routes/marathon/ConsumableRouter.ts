import express from "express"
import ConsumableController from "../../Controller/marathon/ConsumableController.js";
import { requireApiKey } from "../../Middleware/Auth.js"

const router = express.Router()

router.get("/", ConsumableController.getAllConsumables)
router.post("/", requireApiKey, ConsumableController.createConsumables)

export default router