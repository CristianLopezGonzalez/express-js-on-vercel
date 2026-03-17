import express from "express"
import AbilityController from "../../Controller/marathon/AbilityController.js";
import { requireApiKey } from "../../Middleware/Auth.js"

const router = express.Router()

router.get("/", AbilityController.getAllAbilities)
router.post("/", requireApiKey, AbilityController.createAbilities)

export default router