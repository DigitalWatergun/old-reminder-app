import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express"; 
import cron from "node-cron";
import { remindersRoute } from "./routes/remindersRoute.js";
import { findActiveReminders } from "./cron/findActiveReminders.js";
import { runReminders } from "./cron/runReminders.js";
import { consoleLogReminder } from "./cron/consoleLogReminders.js";

dotenv.config({path:"../.env"});

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI);
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

app.use("/reminders", remindersRoute);


app.listen(3000, () => {
    console.log("Server running on port 3000. ");
});


// Cronjob code
cron.schedule('* * * * *', async () => {
    console.log('Retrieving active reminders...');
    const reminders = await findActiveReminders();
    // consoleLogReminder(results);
    runReminders(reminders);
});
  

// function convertMinToMilisecs(min) {
//     const miliseconds = (min * 60) * 1000;

//     return miliseconds;
// };