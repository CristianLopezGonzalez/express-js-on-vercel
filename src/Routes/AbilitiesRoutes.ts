import express from "express";
import {requireApiKey} from "../Middleware/Auth.js";
import AbilitiesController from "../Controller/AbilitiesController.js";

const router = express.Router();

router.get("/", AbilitiesController.getAllAbilities)
router.post("/",AbilitiesController.createAbility,requireApiKey)

export default router;