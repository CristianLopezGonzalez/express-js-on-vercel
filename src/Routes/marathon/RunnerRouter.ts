import express from "express"
import RunnersController from "../../Controller/marathon/RunnersController.js";
import { requireApiKey } from "../../Middleware/Auth.js"

const router = express.Router()

router.get("/", RunnersController.getAllRunners)
router.post("/", requireApiKey, RunnersController.createRunners)

export default router