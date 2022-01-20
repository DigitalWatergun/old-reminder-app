import EventEmitter from "events";
import schedule from "node-schedule";
import { changeReminderStatus } from "../controllers/emitterController.js";
import { sendEmailReminder } from "../mailer/mailer.js"
import { sendTextReminder } from "../texter/texter.js";

const eventEmitter = new EventEmitter(); 


eventEmitter.on("test", () => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}] Testing EventEmitter using GET Request`);
});


eventEmitter.on("RUN", reminder => {
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
            console.log("It's 0")
            changeReminderStatus(reminder, "INACTIVE");
            cronTask.cancel();
        };    
    });
});


eventEmitter.on("EMAIL", reminder => {
    sendEmailReminder(reminder);
});


eventEmitter.on("TEXT", reminder => {
    sendTextReminder(reminder);
});


export { eventEmitter };