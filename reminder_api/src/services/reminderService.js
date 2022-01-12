import { Reminder } from "../models/reminder.js";

const queryAllReminders = async () => {
    const reminders = await Reminder.find({});

    return reminders;
};


const findReminderById = async (id) => {
    const reminder = await Reminder.findOne({_id: id});

    return reminder
}


const filterReminders = async (filter) => {
    const reminders = await Reminder.find(filter);

    return reminders; 
};


const updateReminder = async (data) => {
    console.log(data);
    const reminder = await Reminder.findByIdAndUpdate(data._id, data.update)

    return reminder; 
};


const createReminder = async (data) => {
    try {
        const newReminder = Reminder({
            _id: data._id,
            title: data.title,
            content: data.content,
            minutes: data.minutes,
            status: data.status, 
            email: data.email, 
            mobile: data.mobile, 
            repeat: data.repeat
        });

        await newReminder.save()

        return "Successfully added a new reminder"
    } catch(err) {
        console.log(err);
        return err;
    };
};


const removeReminder = async (title) => {
    try {
        await Reminder.deleteOne({_id: title})

        return "Successfully deleted reminder.";
    } catch(err) {
        console.log(err);
        return err;
    };
};


export { 
    queryAllReminders, 
    createReminder, 
    removeReminder,
    findReminderById,
    filterReminders,
    updateReminder
}; 