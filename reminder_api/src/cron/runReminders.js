const runReminders = async (reminders) => {
    await Promise.all(reminders.map(async(reminder) => {
        const miliseconds = (parseInt(reminder.minutes) * 60) * 1000;
        setTimeout(() => {
            console.log(reminder.title,reminder.content,reminder.minutes)
        }, miliseconds)
    }));
};

export {
    runReminders
};