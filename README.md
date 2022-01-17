# reminder-app

The Reminder application is a custom built application that will allow you to input quick reminders and set how often you want it to notify you. 

### Features
- Add/remove reminders to repeatedly remind you daily, weekly or at custom intervals.
- Get reminded through Email or SMS. 
- Login with Google Auth.


### Unfinished Tasks
- [ ] Modify Mongo Schema to account for "date" reminders, not just repeat reminders
- [ ] Refactor code to check the type of reminder it is (repeat vs date, Email vs SMS)
- [ ] Create API routes to test login, logout, homepage, and settings pages for the application
- [ ] Create a basic page in order to be used for testing
- [ ] Implement local authentication
- [ ] Implement Google OAuth
- [ ] Utilize Reactjs for the front end pieces
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