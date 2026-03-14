import express from "express";
import RolesController from "../Controller/RolesController.js";
import {requireApiKey} from "../Middleware/Auth.js";

const router = express.Router();

router.get("/", RolesController.getRoles)
router.post("/", requireApiKey, RolesController.createRoles)

export default router;