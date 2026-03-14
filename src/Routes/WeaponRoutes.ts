import express from "express";
import WeaponController from "../Controller/WeaponController.js";
import {requireApiKey} from "../Middleware/Auth.js";
const router = express.Router();

router.get("/", WeaponController.getAllWeapons)
router.post("/", WeaponController.createWeapons,requireApiKey)

export default router;