import express from "express";
import AbilitiesController from "../Controller/AbilitiesController.js";

const router = express.Router();

router.get("/", AbilitiesController.getAllAbilities)
router.post("/",AbilitiesController.createAbility)

export default router;