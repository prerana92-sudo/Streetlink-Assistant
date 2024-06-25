import { Router } from "express";
import { addNewAlerts } from "../controller/alerts";
const router = Router();

router.post("/create-alert", addNewAlerts);

export default router;
