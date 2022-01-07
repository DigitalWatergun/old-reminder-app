import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    _id: String,
    title: String,
    content: String, 
    minutes: Number,
    status: String, 
    email: String, 
    mobile: String,
    repeat: Number
});

const Reminder = mongoose.model("Reminder", reminderSchema);

export {Reminder};