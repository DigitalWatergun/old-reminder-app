import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


const sendTextReminder = async (reminder) => {
    client.messages.create({
        body: `REMINDER: ${reminder.title} - ${reminder.content}`,
        from: process.env.TWILIO_NUMBER,
        to: reminder.mobile
    })
    .then(message => {
        console.log(message.body);
    });
};

export { sendTextReminder }