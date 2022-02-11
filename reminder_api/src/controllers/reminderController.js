import _ from "lodash"; 
import { 
    queryAllReminders, 
    queryAllRemindersByUserId,
    createReminder, 
    removeReminder,
    findReminderById,
    filterReminders,
    updateReminder
} from "../services/reminderService.js";
import { bodyValidator } from "../validator/validator.js";
import { eventEmitter } from "../emitter/reminderEmitter.js";


const parseReqBody = body => {
    const data = {};
    for (const [key, value] of Object.entries(body)) {
        if (key === "date") {
            data["date"] = value
            const dateValue = value.split("-")
            data["month"] = dateValue[1]
            data["day"] = dateValue[2]
        };

        if (key === "time") {
            data["time"] = value
            const timeValue = value.split(":")
            data["hour"] = timeValue[0]
            data["minutes"] = timeValue[1]
        };

        if (key === "repeatEnable" && value === true) {
            if (body.minutes === "1") {
                data["minutes"] = "*";
            } else {
                data["minutes"] = body.minutes
            }

            data["hour"] = "*";
            data["day"] = "*";
            data["month"] ="*";
            data["repeat"] = body.repeat
        }

        if (key === "dateEnable" && value === true) {
            data["repeat"] = 1
        }
    };

    data["_id"] = _.snakeCase(body.title + body.userId);
    data["title"] = body.title;
    data["content"] = body.content; 
    data["dateEnable"] = body.dateEnable;
    data["timeEnable"] = body.timeEnable;
    data["weekday"] = "*";
    data["status"] = "INACTIVE";
    data["email"] = body.email; 
    data["mobile"] = body.mobile;
    data["repeatEnable"] = body.repeatEnable;
    data["enableEmail"] = body.enableEmail;
    data["enableSMS"] = body.enableSMS;
    data["userId"] = body.userId

    return data;
};


const getAllRemindersForUser = async (req, res) => {
    const id = req.user._id
    const reminders = await queryAllRemindersByUserId(id);
    
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
    const data = reminder
    data["status"] = status
    const result = await updateReminder(data);

    if (result) {
        return `Updated ${reminder.title} status to ${status}.`
    } else {
        return "Failed to change reminder status."   
    };
};


const changeReminder = async (req, res) => {
    if (bodyValidator(req.body)) {
        const data = parseReqBody(req.body)
        const reminder = await updateReminder(data);
    
        if (reminder) {
            res.send(`Updated ${reminder.title}`);
        } else {
            res.send("Failed to update reminder.")
        }
    } else {
        res.status(500).send("There is an issue with your values for your reminder.")
    }
};


const postReminder = async (req, res) => {
    if (bodyValidator(req.body)) {
        const data = parseReqBody(req.body)
        const result = await createReminder(data);
    
        res.send(result);
    } else {
        res.status(500).send("There is an issue with your values for your reminder.")
    }
};


const deleteReminder = async (req, res) => {
    const id = req.body._id;
    const result = await removeReminder(id);

    res.send(result);
};


const runReminder = async (req, res) => {
    const _id = req.query._id;
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
    const _id = req.query._id;
    const reminder = await findReminderById(_id);

    if (reminder) {
        eventEmitter.emit("STOP", reminder)
        console.log(`Reminder ${reminder.title} has stopped.`)
        return res.send(`Reminder ${reminder.title} has stopped.`)
    } else {
        console.log("No reminders found with that title")
        return res.send("No reminders found with that title.")
    };
};


const listRunningReminders = async (req, res) => {
    const runningReminders = eventEmitter.emit("LIST")
    return res.send(runningReminders)
}


export {
    getAllRemindersForUser, 
    postReminder, 
    deleteReminder,
    getReminderById,
    getReminderByFilter,
    changeReminder,
    getActiveReminders,
    changeReminderStatus,
    runReminder,
    stopReminder,
    listRunningReminders
};