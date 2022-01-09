import mongoose from "mongoose";
import express from "express"; 
import cron from "node-cron";
import { reminders } from "./routes/reminders.js"

// Connect to MongoDB 
mongoose.connect("mongodb://127.0.0.1:27017/reminderDB");
mongoose.connection.on("error", err => {
    console.log("err", err);
})
mongoose.connection.on("connected", (err, res) => {
    console.log("Connected to MongoDB.")
})

// Set up Express server 
const app = express(); 


// Routes for the web server 
app.get("/", (req, res) => {
    res.send("It's working.");
});

app.use("/reminders", reminders);


app.listen(3000, () => {
    console.log("Server running on port 3000. ");
});


// Cronjob code
cron.schedule('* * * * *', () => {
    console.log('Running a function every minute');
});
  