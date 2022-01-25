import EventEmitter from "events";
import schedule from "node-schedule";
import { changeReminderStatus } from "../controllers/reminderController.js";
import { sendEmailReminder } from "./notifications/mailer/mailer.js"
import { sendTextReminder } from "./notifications/texter/texter.js";

const runningReminders = {};
const eventEmitter = new EventEmitter(); 


eventEmitter.on("test", () => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}] Testing EventEmitter using GET Request`);
});


eventEmitter.on("RUN", reminder => {
    changeReminderStatus(reminder, "ACTIVE");
    console.log(`[${new Date().toLocaleTimeString()}] Emitted RUN event.`)
    let count = reminder.repeat; 
    const cronSchedule = `${reminder.minutes} ${reminder.hour} ${reminder.day} ${reminder.month} ${reminder.weekday}`;

    const cronTask = schedule.scheduleJob(cronSchedule, async () => {
        const currentTime = new Date().toLocaleTimeString();
        
        console.log(`[${currentTime}] REMINDER: ${reminder.title} - ${reminder.content}.`)
        
        if (reminder.enableEmail === true) {
            eventEmitter.emit("EMAIL", reminder);
        };

        if (reminder.enableSMS === true) {
            eventEmitter.emit("TEXT", reminder);
        };

        count = count - 1;
        console.log(`Count: ${count}`)
        if (count === 0) {
            console.log("Reminder count has reached 0")
            eventEmitter.emit("STOP", reminder);
        };    
    });

    runningReminders[reminder._id] = cronTask;
});


eventEmitter.on("EMAIL", reminder => {
    sendEmailReminder(reminder);
});


eventEmitter.on("TEXT", reminder => {
    sendTextReminder(reminder);
});


eventEmitter.on("STOP", reminder => {
    changeReminderStatus(reminder, "INACTIVE");
    runningReminders[reminder._id].cancel();
    console.log(`${reminder.title} has stopped running.`)
})


export { eventEmitter };