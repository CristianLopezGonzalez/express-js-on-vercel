import express from "express";
import MapsController from "../Controller/MapsController.js";
import {requireApiKey} from "../Middleware/Auth.js";
const router = express.Router();

router.get("/", MapsController.getAllMaps)
router.post("/",MapsController.createMaps,requireApiKey)

export default router;