import express from "express"; 
import mongoose from "mongoose"; 

// Set up Express server 
const app = express(); 

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


// Routes for the web server 
app.get("/", (req, res) => {
    res.send("It's working.");
});

app.route("/reminders")
    .get((req, res) => {
        Reminder.find({}, (err, reminders) => {
            if (!err) {
                res.send(reminders);
            } else {
                console.log(err);
                res.send(err);
            };
        });
    })
    .post((req, res) => {
        const reminder = new Reminder({
            _id: req.query.title,
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
    })
    .delete((req, res) => {
        Reminder.deleteOne({title: req.query.title}, (err, foundReminder) => {
            if (!err) {
                res.send("Successfully deleted reminder");
            } else {
                res.send(err);
            };
        });
    });


app.listen(3000, () => {
    console.log("Server running on port 3000. ");
});