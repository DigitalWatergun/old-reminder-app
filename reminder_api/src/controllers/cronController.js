import { filterReminders, updateReminder } from "../services/reminderService.js";


const getActiveReminders = async () => {
    const reminders = await filterReminders({status: "active"})

    if (reminders) {
        return reminders
    } else {
        return "No active reminders found."
    };
};


const changeReminderStatus = async () => {

};


const changeReminderRepeat = async () => {

};


export {
    getActiveReminders
}