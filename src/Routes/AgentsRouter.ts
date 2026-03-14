import express from "express"
import AgentsController from "../Controller/AgentsController.js";
import {requireApiKey} from "../Middleware/Auth.js";

const router = express.Router();

router.get("/", AgentsController.getAllAgents)
router.post("/", requireApiKey, AgentsController.crateAgent)

export default router;


