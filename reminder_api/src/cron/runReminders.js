const runReminders = async (reminders) => {
    await Promise.all(reminders.map(async(reminder) => {
        console.log(reminder.title,reminder.content,reminder.minutes);
    }));
};

export {
    runReminders
};