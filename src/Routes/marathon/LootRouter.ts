import express from "express"
import LootController from "../../Controller/marathon/LootController.js";
import { requireApiKey } from "../../Middleware/Auth.js"

const router = express.Router()

router.get("/", LootController.getAllLoot)
router.post("/", requireApiKey, LootController.createLoot)

export default router