import express from "express";
import {requireApiKey} from "../../Middleware/Auth.js";
import AbilitiesController from "../../Controller/valorant/AbilitiesController.js";

const router = express.Router();

router.get("/", AbilitiesController.getAllAbilities)
router.post("/", requireApiKey, AbilitiesController.createAbility)

export default router;