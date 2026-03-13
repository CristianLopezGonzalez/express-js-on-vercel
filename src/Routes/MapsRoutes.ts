import express from "express";
import MapsController from "../Controller/MapsController.js";

const router = express.Router();

router.get("/", MapsController.getAllMaps)
router.post("/",MapsController.createMaps)

export default router;