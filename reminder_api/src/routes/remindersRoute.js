import express from "express";
import {
    getAllReminders, 
    postReminder, 
    deleteReminder,
    getReminderById,
    getReminderByFilter,
    changeReminder,
    runReminder,
    stopReminder
} from "../controllers/reminderController.js";

const router = express.Router();

router.get("/", getAllReminders);
router.get("/title", getReminderById);
router.get("/filter", getReminderByFilter);
router.get("/run", runReminder)
router.get("/stop", stopReminder)
router.patch("/update", changeReminder)
router.post("/", postReminder);
router.delete("/", deleteReminder);


export { router as remindersRoute };