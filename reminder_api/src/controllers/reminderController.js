import _ from "lodash"; 
import { 
    queryAllReminders, 
    createReminder, 
    removeReminder,
    findReminderById,
    filterReminders,
    updateReminder
} from "../services/reminderService.js";
import { eventEmitter } from "../emitter/reminderEmitter.js";


const getAllReminders = async (req, res) => {
    const reminders = await queryAllReminders();
    eventEmitter.emit("test");
    
    return res.send(reminders);
};


const getReminderById = async (req, res) => {
    const _id = _.toLower(req.query.title);
    const reminder = await findReminderById(_id);

    if (reminder) {
        return res.send(reminder);
    } else {
        return res.send("No reminders found with that title.");
    };
};


const getReminderByFilter = async (req, res) => {
    const data = {};

    for (let [key, value] of Object.entries(req.query)) {
        if (key.includes("id") && key !== "_id") {
            key = "_id";
            value = _.toLower(value);
        } else if (key.includes("id")) {
            value = _.toLower(value);
        };
        data[key] = value;
    }

    const reminders = await filterReminders(data);

    if (reminders) {
        res.send(reminders);
    } else {
        res.send("No reminders found.");
    };
};


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


const changeReminder = async (req, res) => {
    const data = {
        "update": {}
    };

    for (let [key, value] of Object.entries(req.query)) {
        if (key.includes("id")) {
            if (key.includes("id") && key !== "_id") {
                key = "_id";
                value = _.toLower(value);
            } else  {
                value = _.toLower(value);
            };
            data[key] = value;
        } else {
            data["update"][key] = value;
        };
    };

    const reminder = await updateReminder(data);

    if (reminder) {
        res.send(`Updated ${reminder.title}`);
    } else {
        res.send("Failed to update reminder.")
    }
};


const postReminder = async (req, res) => {
    const data = {
        _id: _.toLower(req.query.title),
        title: req.query.title,
        content: req.query.content,
        minutes: req.query.minutes,
        hour: req.query.hour,
        day: req.query.day, 
        month: req.query.month,
        weekday: req.query.weekday,
        status: "INACTIVE",
        email: req.query.email,
        mobile: req.query.mobile,
        repeat: req.query.repeat,
        enableSMS: req.query.enableSMS,
        enableEmail: req.query.enableEmail,
    }
    const result = await createReminder(data);

    res.send(result);
};


const deleteReminder = async (req, res) => {
    const title = _.toLower(req.query.title);
    const result = await removeReminder(title);

    res.send(result);
};


const runReminder = async (req, res) => {
    const _id = _.toLower(req.query.title);
    const reminder = await findReminderById(_id);

    if (reminder) {
        if (reminder.status === "INACTIVE") {
            eventEmitter.emit("RUN", reminder)
            return res.send(`Reminder ${reminder.title} has started running.`);
        } else {
            return res.send("Reminder is already running.");
        }
    } else {
        return res.send("No reminders found with that title.");
    };
};


const stopReminder = async (req, res) => {
    const _id = _.toLower(req.query.title);
    const reminder = await findReminderById(_id);

    if (reminder) {
        eventEmitter.emit("STOP", reminder)
        return res.send(`Reminder ${reminder.title} has stopped.`)
    } else {
        return res.send("No reminders found with that title.")
    };
};


export {
    getAllReminders, 
    postReminder, 
    deleteReminder,
    getReminderById,
    getReminderByFilter,
    changeReminder,
    getActiveReminders,
    changeReminderStatus,
    runReminder,
    stopReminder
};