import { filterReminders, updateReminder } from "../services/reminderService.js";


const getActiveReminders = async () => {
    const reminders = await filterReminders({status: "ACTIVE"});

    return reminders;
};


const changeReminderStatus = async (reminder, status) => {
    const data = {_id: reminder._id, update: {status: status}}

    const result = await updateReminder(data);

    if (result) {
        return `Updated ${reminder.title} status to ${status}.`
    } else {
        return "Failed to change reminder status."   
    };
};


export {
    getActiveReminders,
    changeReminderStatus
}