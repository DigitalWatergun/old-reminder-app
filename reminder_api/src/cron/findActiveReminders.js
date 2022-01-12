import {getActiveReminders} from "../controllers/cronController.js"

const findActiveReminders = async () => {
    const activeReminders = await getActiveReminders();

    if (activeReminders) {
        return activeReminders;
    } else {
        return "No active reminders found."
    };
};

export { findActiveReminders };