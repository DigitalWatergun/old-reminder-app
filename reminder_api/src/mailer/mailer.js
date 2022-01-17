import dotenv from "dotenv";
dotenv.config({path: "../.env"});

import nodemailer from "nodemailer"; 
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

const sendEmailReminder = async (reminder) => {
    const createTransporter = async () => {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET
        );
    
        oauth2Client.setCredentials(
            {refresh_token: process.env.REFRESH_TOKEN}
        );
    
        const accessToken = oauth2Client.getAccessToken();
    
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                accessToken: accessToken, 
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN
            }
        });
    
        return transporter;
    };

    const emailOptions = {
        subject: `REMINDER: ${reminder.title}`,
        text: `REMINDER FROM REMINDER APP\n${reminder.content}`,
        to: reminder.email
    };
    
    let transporter = await createTransporter();
    await transporter.sendMail(emailOptions);
};


export { sendEmailReminder };