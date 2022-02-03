import { getActiveReminders } from "../controllers/reminderController.js";
import { eventEmitter } from "../emitter/reminderEmitter.js";

const runActiveReminders = async () => {
    const activeReminders = await getActiveReminders();
    if (activeReminders) {
        for (const reminder of activeReminders) {
            eventEmitter.emit("RUN", reminder)
            console.log(`Reminder ${reminder.title} has started running.`)
        }
    }
}

export { runActiveReminders }