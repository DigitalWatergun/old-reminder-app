import mongoose from "mongoose";
import { Reminder } from "../models/reminder.js";

// // Connect to MongoDB 
// mongoose.connect("mongodb://127.0.0.1:27017/reminderDB", err => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log("Connected to MongoDB.")
//     }
// });

// // Create MongoDB Connection 
// const connection = mongoose.connection;
// connection.once("open", () => {
//     console.log("Connected");
// })


// Queries all the reminders in the database 
async function queryDatabase() {
    let results;

    try {
        results = await Reminder.find({status:"active"});
    } catch(err) {
        console.log(err);
    } finally {
        connection.close();
        return results;
    };
};


function convertMinToMilisecs(min) {
    const miliseconds = (min * 60) * 1000;

    return miliseconds;
};


// async function main() {
//     let query = await queryReminders();
//     console.log(query);

//     const miliseconds = convertMinToMilisecs(1);
// };


// main();

export { queryDatabase };