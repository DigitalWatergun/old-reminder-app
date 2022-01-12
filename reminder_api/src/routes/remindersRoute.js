import express from "express";
import {
    getAllReminders, 
    postReminder, 
    deleteReminder,
    getReminderById,
    getReminderByFilter,
    changeReminder
} from "../controllers/reminderController.js";

const router = express.Router();

router.get("/", getAllReminders);
router.get("/title", getReminderById);
router.get("/filter", getReminderByFilter);
router.patch("/update", changeReminder)
router.post("/", postReminder);
router.delete("/", deleteReminder);


export { router as remindersRoute };