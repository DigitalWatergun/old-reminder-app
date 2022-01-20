import _ from "lodash";
import { eventEmitter } from "../emitter/reminderEmitter.js";
import { findReminderById } from "../services/reminderService.js";

const runReminder = async (req, res) => {
    const _id = _.toLower(req.query.title);
    const reminder = await findReminderById(_id);

    if (reminder) {
        if (reminder.status === "INACTIVE") {
            eventEmitter.emit("RUN", reminder)
            return res.send(reminder);
        } else {
            return res.send("Reminder is already running.");
        }
    } else {
        return res.send("No reminders found with that title.");
    };
};


export {
    runReminder
}