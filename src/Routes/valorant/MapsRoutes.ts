import express from "express";
import MapsController from "../../Controller/valorant/MapsController.js";
import {requireApiKey} from "../../Middleware/Auth.js";

const router = express.Router();

router.get("/", MapsController.getAllMaps)
router.post("/", requireApiKey, MapsController.createMaps,)

export default router;