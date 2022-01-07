import mongoose from "mongoose";
import { Reminder } from "../models/reminder.js";

// Connect to MongoDB 
mongoose.connect("mongodb://127.0.0.1:27017/reminderDB", err => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connected to MongoDB.")
    }
});


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connected");
})


const queryReminders = () => {
    const reminders = [];
    Reminder.find({}, (err, foundReminders) => {
        if (!err) {
            console.log(foundReminders);
        } else {
            console.error(err);
        }
        connection.close();
    });
}



queryReminders();