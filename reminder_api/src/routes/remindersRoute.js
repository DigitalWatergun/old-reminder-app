import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import {
    getAllRemindersForUser, 
    postReminder, 
    deleteReminder,
    getReminderById,
    getReminderByFilter,
    changeReminder,
    runReminder,
    stopReminder,
    listRunningReminders
} from "../controllers/reminderController.js";

const router = express.Router();

router.use(authenticateToken)

router.get("/", getAllRemindersForUser);
router.get("/title", getReminderById);
router.get("/filter", getReminderByFilter);
router.get("/run", runReminder)
router.get("/stop", stopReminder)
router.get("/list", listRunningReminders)
router.patch("/update", changeReminder)
router.post("/", postReminder);
router.delete("/", deleteReminder);


export { router as remindersRoute };