import express from "express";
import { runReminder } from "../controllers/runReminderController.js"

const router = express.Router();

router.get("/", runReminder);

export { router as runReminderRoute };