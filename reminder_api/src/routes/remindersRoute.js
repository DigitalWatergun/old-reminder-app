import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
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

router.use(verifyJWT)

// router.get("/", getAllRemindersForUser);
// router.post("/", postReminder);
// router.delete("/", deleteReminder);
router.route("/")
    .get(getAllRemindersForUser)
    .post(postReminder)
    .delete(deleteReminder)
router.get("/title", getReminderById);
router.get("/filter", getReminderByFilter);
router.get("/run", runReminder)
router.get("/stop", stopReminder)
router.get("/list", listRunningReminders)
router.patch("/update", changeReminder)


export { router as remindersRoute };