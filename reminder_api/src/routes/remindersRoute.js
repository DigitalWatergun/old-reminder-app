import express from "express";
import { getAllReminders, postReminder, deleteReminder } from "../controllers/reminderController.js";

const router = express.Router();

router.get("/", getAllReminders);
router.post("/", postReminder);
router.delete("/", deleteReminder);


export { router as remindersRoute };