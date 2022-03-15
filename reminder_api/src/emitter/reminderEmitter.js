import EventEmitter from "events";
import schedule from "node-schedule";
import cron from "cron";
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
    
    let count = reminder.repeat 
    const cronSchedule = `${reminder.minutes} ${reminder.hour} ${reminder.day} ${reminder.month} ${reminder.weekday}`;
    console.log(`[${new Date().toLocaleTimeString()}] Emitted RUN event. REMINDER: ${reminder.title} - ${reminder.content}. Cronschedule: ${cronSchedule}`)
    const cronTask = new cron.CronJob(cronSchedule, () => {
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
        }, null, true, reminder.timeZone)

    runningReminders[reminder._id] = cronTask;
});


eventEmitter.on("EMAIL", reminder => {
    sendEmailReminder(reminder);
});


eventEmitter.on("TEXT", reminder => {
    sendTextReminder(reminder);
});


eventEmitter.on("STOP", reminder => {
    console.log(runningReminders);
    changeReminderStatus(reminder, "INACTIVE");
    if (runningReminders[reminder._id]) {
        runningReminders[reminder._id].stop();
        console.log(`${reminder.title} has stopped running.`)
        delete runningReminders[reminder._id];
    } else {
        console.log(`No reminders found with the title ${reminder.title}.`)
    }
})


eventEmitter.on("LIST", () => {
    console.log(runningReminders)
    return runningReminders
})


export { eventEmitter };