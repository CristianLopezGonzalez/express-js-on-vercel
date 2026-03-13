import express from "express";
import RolesController from "../Controller/RolesController.js";

const router = express.Router();

router.get("/",RolesController.getRoles)
router.post("/",RolesController.createRoles)

export default router;