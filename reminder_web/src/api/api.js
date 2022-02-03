
const BASEURL = "http://localhost:3001"


const getAllReminders = async () => {
    const response = await fetch(BASEURL + "/reminders")
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

    const response = await fetch(BASEURL + "/reminders", fetchOptions)
    if (response.ok) {
        return response
    } else {
        console.log("RESPONSE CODE IS NOT OKAY")
        console.log(response.status)
        console.log(response.statusText)
        alert(response.statusText)
    }
}


const deleteReminder = async (data) => {
    const fetchOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    const response = await fetch(BASEURL + "/reminders", fetchOptions)
    if (response.ok) {
        console.log("Response is okay.")
        window.location.reload();
    } else {
        console.log("Response code is not okay.")
        throw Error()
    }
}


const editReminder = async (data) => {
    const fetchOptions = {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    const response = await fetch(BASEURL + "/reminders/update", fetchOptions)
    if (response.ok) {
        console.log("Response is ok. Successfully updated the reminder.")
        return response
    } else {
        console.log("Response code is not okay.")
        console.log(response.status)
        console.log(response.statusText)
        alert(response.statusText)
    }
}


const runReminder = async (data) =>{
    const query = `?_id=${data._id}`

    const response = await fetch(BASEURL + "/reminders/run" + query)
    if (response.ok) {
        console.log("Response is okay.")
        window.location.reload();
    } else {
        console.log("Response code is not okay.")
        throw Error()
    }
}


const stopReminder = async (data) => {
    const query = `?_id=${data._id}`

    const response = await fetch(BASEURL + "/reminders/stop" + query)
    console.log(response);
    if (response.ok){
        window.location.reload();
        console.log("Response is ok")
        return "Response is okay"
    } else {
        console.log("Response codei s not okay.")
        throw Error();
    }
}


export const api = {
    getAllReminders,
    createReminder,
    deleteReminder,
    editReminder,
    runReminder,
    stopReminder
}