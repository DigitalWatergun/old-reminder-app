import { queryAllReminders } from "../services/reminderService.js"

// Queries all the reminders in the database 
async function queryDatabase() {
    const results = await queryAllReminders();
    
    if (results) {
        return results; 
    };
};


function convertMinToMilisecs(min) {
    const miliseconds = (min * 60) * 1000;

    return miliseconds;
};


// async function main() {
//     let query = await queryReminders();
//     console.log(query);

//     const miliseconds = convertMinToMilisecs(1);
// };


// main();

export { queryDatabase };