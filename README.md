# reminder-app

The Reminder application is a custom built application that will allow you to input quick reminders and set how often you want it to notify you. 

### Features
- Add/remove reminders to repeatedly remind you daily, weekly or at custom intervals.
- Get reminded through Email or SMS. 


### Unfinished Tasks
- [ ] Fix "Date Only" reminders to remind user at midnight of no time has been added
- [ ] Add error handling for Nodemailer errors (display error to user)
- [ ] Add error handling for Twilio errors (display error to user)
- [ ] Add expiration date for the activation code 
- [ ] Figure out how to block unexisting routes to express server 

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
- [x] ~~Create React component for Reminders page and properly query API route~~
- [x] ~~Create React component for Create Reminders page~~
- [x] ~~Implement a "Timer" option on the Create Reminders page to have repeated reminders every x minutes~~
- [x] ~~Implement CreateReminders page to call backend api and store in database with proper mongo schema~~
- [x] ~~Add Headers and Footers components to make all pages consistent~~
- [x] ~~Create React component to Delete reminders from database~~
- [x] ~~Refactor all API code in React Components into src/api/api.js~~
- [x] ~~Create React component to render popup box for Edit Reminders~~
- [x] ~~Create React component to edit reminders already created~~
- [x] ~~Modified ReminderForm to work for both creating and editing reminders~~
- [x] ~~Create React button to Run Reminders~~ 
- [x] ~~Fix EventEmitter for "Date" reminders and refactored reminderController.js~~
- [x] ~~Create React button to stop currently running reminders~~
- [x] ~~Add function to validate the req.body before creating/editing reminders~~
- [x] ~~Add User model, service, controller, route, and code to create/login/retrieve users~~
- [x] ~~Add JWT functions to create access/refresh tokens and refresh access tokens~~ 
- [x] ~~Create Login page with login fields and submit request to login and save tokens in sessionStorage~~
- [x] ~~Added LoginUser API call in front end and modified getAllReminders to use accessToken~~ 
- [x] ~~Added accessToken verify route for users to verify if their access tokens are valid~~
- [x] ~~Implemented Axios Interceptor to automatically refresh accessTokens~~
- [x] ~~Converted all fetch request to use Axios instances~~
- [x] ~~Modified Header and HeaderFooter component to add Profile component~~
- [x] ~~Added ProfileDetails component and Logout feature to remove refreshToken from sessionStorage/mongodb~~
- [x] ~~Create "settings" page for users to change password / delete account~~
- [x] ~~Create "Change Password" page and added API call to update user with new hashed password~~
- [x] ~~Create "Delete" button for users to delete their account from the application~~
- [x] ~~Added sticky note icon to home page~~
- [x] ~~Refactor api.js to use try/catch blocks and have errors be handled on react components~~
- [x] ~~Remove all reminders for a user whenever the user deletes their account~~
- [x] ~~Add Register page and added api call to create user~~
- [x] ~~Add Route Protection to make sure user is authenticated for certain pages~~
- [x] ~~Add email verification when registering a user~~
- [x] ~~Add loading state for buttons when registering, creating, and changing passwords~~
- [x] ~~Remove registerHash from db after user has been activated~~
- [x] ~~Make sure emails in User db are unique and not repeated~~
- [x] ~~Impelement "Forgot Password" feature~~
- [x] ~~Force users to change their passwords after logging in with "forgot password"~~
- [x] ~~Add styling to frontend using CSS~~
- [x] ~~Refactor code to store refreshToken in httpOnly cookie instead of sessionStorage~~
- [x] ~~Fix refreshToken interceptors for axiosReminders instance~~
- [x] ~~Refactor code to have accessToken in httpOnly cookie~~
- [x] ~~Fix "Enter" button on all React forms~~
- [x] ~~Add 404 Error page for URLs that don't exist for React frontend~~
- [x] ~~Replace user IDs with UUIDs~~
- [x] ~~Replace reminder ID with UUIDs and fixed editing reminders for the "Title" field~~
- [x] ~~Fix Axios Interceptor to account for 401 status code during /reminders call~~
- [x] ~~Add form validation to Registration form~~ 
- [x] ~~Add password complexity requirements~~
- [x] ~~Add password, email, and sms input validation as well as form validation for creating reminders~~