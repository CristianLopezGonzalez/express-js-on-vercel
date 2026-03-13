import express from "express";
import WeaponController from "../Controller/WeaponController.js";
const router = express.Router();

router.get("/", WeaponController.getAllWeapons)
router.post("/", WeaponController.createWeapons)

export default router;