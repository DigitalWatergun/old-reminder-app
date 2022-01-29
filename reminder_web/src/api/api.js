
const BASEURL = "http://localhost:3001/reminders"


const getAllReminders = async () => {
    const response = await fetch(BASEURL)
    if (response.ok) {
        return response.json();
    } else {
        console.log("RESPONSE CODE IS NOT OKAY")
        console.log(response.status)
        console.log(response.statusText)
        throw Error()
    }
}


const createReminder = async (data) => {
    const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    const response = await fetch(BASEURL, fetchOptions)
    if (response.ok) {
        return response
    } else {
        console.log("RESPONSE CODE IS NOT OKAY")
        console.log(response.status)
        console.log(response.statusText)
        throw Error()
    }
}


const deleteReminder = async (data) => {
    const fetchOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    const response = await fetch(BASEURL, fetchOptions)
    if (response.ok) {
        console.log("Response is okay.")
        window.location.reload();
    } else {
        console.log("Response code is not okay.")
        throw Error()
    }
}


export const api = {
    getAllReminders,
    createReminder,
    deleteReminder
}