import { getActiveReminders, 
    changeReminderStatus } from "../controllers/cronController.js";

const runReminders = async () => {
    const reminders = await getActiveReminders();

    if (reminders.length > 0) {
        console.log(reminders);
        await Promise.all(reminders.map(async(reminder) => {
            changeReminderStatus(reminder, "RUNNING");
            
            let count = reminder.repeat;
            const miliseconds = (reminder.minutes * 60) * 1000;

            const reminderInterval = setInterval(() => {
                console.log("REMINDER:",reminder.title,reminder.content,reminder.minutes);
                count = count - 1

                if (count === 0) {
                    changeReminderStatus(reminder, "INACTIVE");
                    clearInterval(reminderInterval);
                }
            }, miliseconds)
        }));
    } else {
        console.log("No active reminders.")
    }
};

export {
    runReminders
};