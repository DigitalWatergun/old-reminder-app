import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express"; 
import cors from "cors";
import { remindersRoute } from "./routes/remindersRoute.js";
import { runActiveReminders } from "./startup/runActiveReminders.js"
dotenv.config();


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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes for the web server 
app.get("/", (req, res) => {
    res.send("It's working.");
});

app.use("/reminders", remindersRoute);


app.listen(3001, () => {
    runActiveReminders();
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}] Server running on port 3001.`);
});