import express from "express"
import AgentsController from "../Controller/AgentsController.js";

const router  = express.Router();

router.get("/",AgentsController.getAllAgents)
router.post("/",AgentsController.crateAgent)

export default router;


