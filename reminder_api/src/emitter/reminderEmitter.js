import EventEmitter from "events";
import { changeReminderStatus } from "../controllers/emitterController.js";
import { sendEmailReminder } from "../mailer/mailer.js"
import { sendTextReminder } from "../texter/texter.js";

const eventEmitter = new EventEmitter(); 


eventEmitter.on("test", () => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}]: Testing EventEmitter using GET Request`);
});


eventEmitter.on("RUN", reminder => {
    let count = reminder.repeat; 
    const miliseconds = (reminder.minutes * 60) * 1000;

    const reminderInterval = setInterval(() => {
        const currentTime = new Date().toLocaleTimeString();
        console.log(`[${currentTime}] REMINDER: ${reminder.title} - ${reminder.content}. ${reminder.minutes}`)

        if (reminder.enableSMS === true) {
            eventEmitter.emit("TEXT", reminder);
        };

        if (reminder.enableEmail === true) {
            eventEmitter.emit("EMAIL", reminder);
        };

        count = count - 1; 

        if (count === 0) {
            changeReminderStatus(reminder, "INACTIVE");
            clearInterval(reminderInterval);
        }
    }, miliseconds);
});


eventEmitter.on("EMAIL", reminder => {
    sendEmailReminder(reminder);
});


eventEmitter.on("TEXT", reminder => {
    sendTextReminder(reminder);
});


export { eventEmitter };