import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express"; 
import cron from "node-cron";
import { remindersRoute } from "./routes/remindersRoute.js"
import { queryDatabase } from "./cron/queryDatabase.js"
import { consoleLogReminder } from "./cron/consoleLogReminders.js"

dotenv.config();

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_DB);
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
    console.log('Running a function every minute');
    const results = await queryDatabase();
    console.log(results);
});
  