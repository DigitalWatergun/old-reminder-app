import express from "express"; 
import { reminders } from "./routes/reminders.js"

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