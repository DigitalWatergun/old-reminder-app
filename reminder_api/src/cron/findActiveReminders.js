function findActiveReminders(reminders) {
    const activeReminders = [];
    for (const reminder of reminders) {
        if (reminder["status"] === "active") {
            activeReminders.push(reminder);
        }
    }

    return activeReminders;
}; 

export { findActiveReminders };