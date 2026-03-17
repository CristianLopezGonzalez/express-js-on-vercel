import express from "express";
import WeaponController from "../../Controller/valorant/WeaponController.js";
import {requireApiKey} from "../../Middleware/Auth.js";

const router = express.Router();

router.get("/", WeaponController.getAllWeapons)
router.post("/", requireApiKey, WeaponController.createWeapons)

export default router;