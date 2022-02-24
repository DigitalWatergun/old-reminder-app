import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


const sendTextReminder = async (reminder) => {
    try {
        const result = await client.messages.create({
            body: `REMINDER: ${reminder.title} - ${reminder.content}`,
            from: process.env.TWILIO_NUMBER,
            to: reminder.mobile
        })
        console.log(result.body)
    } catch (error) {
        console.log(error) 
        return error
    }
};

export { sendTextReminder }