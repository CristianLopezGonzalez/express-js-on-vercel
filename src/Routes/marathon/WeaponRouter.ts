import express from "express"
import WeaponsController from "../../Controller/marathon/WeaponsController.js";
import { requireApiKey } from "../../Middleware/Auth.js"

const router = express.Router()

router.get("/", WeaponsController.getAllWeapons)
router.post("/", requireApiKey, WeaponsController.createWeapons)

export default router