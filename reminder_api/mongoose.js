import mongoose from "mongoose"; 

// Connect to MongoDB and specify Schema for model 
mongoose.connect("mongodb://127.0.0.1:27017/reminderDB");
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

export {Reminder}