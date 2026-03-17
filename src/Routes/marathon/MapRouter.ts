import express from "express"
import MapController from "../../Controller/marathon/MapController.js";
import { requireApiKey } from "../../Middleware/Auth.js"

const router = express.Router()

router.get("/", MapController.getAllMaps)
router.post("/", requireApiKey, MapController.createMaps)

export default router