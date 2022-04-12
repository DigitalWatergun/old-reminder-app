
const convertRemindersToLocal = (reminders) => {
	for (const reminder of reminders) {
		const year = reminder.utcDateTime.split("-")[0]
		const utcDateTime = new Date(Date.UTC(year, reminder.month, reminder.day, reminder.hour, reminder.minutes))
		let localMonth = (utcDateTime.getMonth() + 1).toString();
		let localDay = (utcDateTime.getDate()).toString();
		let localHour = utcDateTime.getHours().toString();
		let localMinutes = utcDateTime.getMinutes().toString();

		if (localMonth.length === 1) {
			localMonth = "0" + localMonth
		}

		if (localDay.length === 1) {
			localDay = "0" + localDay
		}

		if (localHour.length === 1) {
			localHour = "0" + localHour
		}

		if (localMinutes.length === 1) {
			localMinutes = "0" + localMinutes
		}

		reminder["date"] = `${year}-${localMonth}-${localDay}`
		reminder["month"] = localMonth
		reminder["day"] = localDay
		reminder["time"] = `${localHour}:${localMinutes}`
		reminder["hour"] = localHour
		reminder["minutes"] = localMinutes
	}

	return reminders
}


export {
	convertRemindersToLocal
}