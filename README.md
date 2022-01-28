# reminder-app

The Reminder application is a custom built application that will allow you to input quick reminders and set how often you want it to notify you. 

### Features
- Add/remove reminders to repeatedly remind you daily, weekly or at custom intervals.
- Get reminded through Email or SMS. 
- Login with Google Auth.


### Unfinished Tasks
- [ ] Create React component to Delete reminders from database
- [ ] Create React button to Run Reminders 
- [ ] Create React component to stop currently running reminders 
- [ ] Create React component and page to edit reminders already created
- [ ] Create Home page 
- [ ] Implement local authentication
- [ ] Implement Google OAuth
- [ ] Figure out API routing and React component hierarchy 
- [ ] Properly display reminder data on React components 
- [ ] Create "settings" page for user to set their own intervals/timer for their reminder and email/sms notifications
- [ ] Utilize a UI framework (Material UI) for the front end pages 

### Finished Tasks
- [x] ~~Create GitHub Repo to store all notes, project files and add gitignore~~
- [x] ~~Create frontend and backend directories~~
- [x] ~~Create locally hosted MongoDB database~~
- [x] ~~Figure out database schema (reminder text, intervals/frequency, status, email, SMS, etc.)~~
- [x] ~~Create express.js server in backend directory~~
- [x] ~~Write code to connect to MongoDB and retrieve the reminder information~~
- [x] ~~Create API route to GET, POST, and DELETE reminders~~
- [x] ~~Implement lodash to make the id of the reminder lowercase~~
- [x] ~~Separate mongoose code from server.js into separate "database" folder~~
- [x] ~~Implement Express Router~~
- [x] ~~Created models folder and separate reminder model from code into reminder.js~~
- [x] ~~Write function to query database items and look for active reminders~~
- [x] ~~Refactor code to add ".env" file instead of hardcoding localhost:27017~~
- [x] ~~Refactor code to use MVC design model~~
- [x] ~~Add getReminderById, getReminderByFilter, and changeReminder routes, controllers, and services~~
- [x] ~~Implement node-cron to create cronjobs~~
- [x] ~~Retrieve all active reminders in the database to use for the cronjob~~ 
- [x] ~~Write function to asynchronously look through reminders and log them after their listed minutes~~ 
- [x] ~~Write function to look at the minutes for each reminder, log reminder, and decrease repeat count~~
- [x] ~~Refactor cronjob code to use event emitters each time a new reminder has been added~~
- [x] ~~Implement Email notification functionality (Nodemailer, Gmail OAuth2)~~
- [x] ~~Implement SMS text functionality (Twilio)~~
- [x] ~~Modify MongoDB Schema to add "enableSMS" and "enableEmail" booleans~~
- [x] ~~Add If statements to check if it is a email or SMS reminder, and notify accordingly~~
- [x] ~~Replace setInterval() with node-schedule in emitter functions~~
- [x] ~~Fix bug where you can have duplicate events of one reminder running~~
- [x] ~~Modify Mongo Schema to account for "date" reminders, not just repeat reminders~~
- [x] ~~Start implementing Reactjs for frontend~~
- [x] ~~Refactor runReminder and emitter code to clean up files. Combined with remindersRoute.js~~
- [x] ~~Implement route to stop running reminders that have been started previously~~
- [x] ~~Implement ability to set dates/times to be reminded on~~
- [x] ~~Added React Router and Test/Reminder pages to make sure Router is working~~
- [x] ~~Set up React to display all reminders as JSON strings on Reminder page~~
- [x] ~~Create React Component for Reminders page and properly query API route~~
- [x] ~~Create React Component for Create Reminders page~~
- [x] ~~Implement a "Timer" option on the Create Reminders page to have repeated reminders every x minutes~~
- [x] ~~Implement CreateReminders page to call backend api and store in database with proper mongo schema~~
- [x] ~~Add Headers and Footers components to make all pages consistent~~