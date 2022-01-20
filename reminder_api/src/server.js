import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express"; 
import { remindersRoute } from "./routes/remindersRoute.js";
import { runReminderRoute } from "./routes/runReminderRoute.js"

dotenv.config({path:"../.env"});

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("error", err => {
    console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
    console.log("Connected to MongoDB.");
});

// Set up Express server 
const app = express(); 


// Routes for the web server 
app.get("/", (req, res) => {
    res.send("It's working.");
});

app.use("/reminders", remindersRoute);
app.use("/runReminder", runReminderRoute);


app.listen(3000, () => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}] Server running on port 3000.`)
});