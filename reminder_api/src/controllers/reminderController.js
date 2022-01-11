import _ from "lodash"; 
import { queryAllReminders, createReminder, removeReminder } from "../services/reminderService.js";

const getAllReminders = async (req, res) => {
    let reminders = await queryAllReminders();
    
    return res.send(reminders);
};

const postReminder = async (req, res) => {
    const data = {
        _id: _.toLower(req.query.title),
        title: req.query.title,
        content: req.query.content,
        minutes: req.query.minutes,
        status: req.query.status,
        email: req.query.email,
        mobile: req.query.mobile,
        repeat: req.query.repeat
    }
    const result = await createReminder(data);

    res.send(result);
};

const deleteReminder = async (req, res) => {
    const title = _.toLower(req.query.title);
    const result = await removeReminder(title);

    res.send(result);
};

export {getAllReminders, postReminder, deleteReminder};