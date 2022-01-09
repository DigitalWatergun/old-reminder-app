import express from "express";
import _ from "lodash"; 
import { Reminder } from "../models/reminder.js";

const router = express.Router();

router.get("/", (req, res) => {
    Reminder.find({}, (err, reminders) => {
        if (!err) {
            res.send(reminders);
        } else {
            console.log(err);
            res.send(err);
        };
    });
});

router.post("/", (req, res) => {
    const reminder = new Reminder({
        _id: _.toLower(req.query.title),
        title: req.query.title,
        content: req.query.content,
        minutes: req.query.minutes,
        status: req.query.status,
        email: req.query.email,
        mobile: req.query.mobile,
        repeat: req.query.repeat
    });

    reminder.save((err) => {
        if (!err) {
            res.send("Successfully added a new reminder.");
        } else {
            res.send(err);
        };
    });
});

router.delete("/", (req, res) => {
    Reminder.deleteOne({_id: _.toLower(req.query.title)}, (err, foundReminder) => {
        if (!err) {
            res.send("Successfully deleted reminder");
        } else {
            res.send(err);
        };
    });
});

export { router as remindersRoute };