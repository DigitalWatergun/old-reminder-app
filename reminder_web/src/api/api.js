import axios from "axios"

const BASEURL = "http://localhost:3001";
// const BASEURL = "http://api.mrreminder.xyz"

const axiosAuth = axios.create({
    baseURL: BASEURL,
    headers: { "Content-Type": "application/json"},
    withCredentials: true
});


const axiosReminders = axios.create({
    baseURL: BASEURL, 
    headers: { 
        "Content-Type": "application/json"
    },
    withCredentials: true
});


const registerUser = async (data) => {
    try {
        const response = await axiosAuth.post(BASEURL + "/users", JSON.stringify(data))
        if (response) {
            return response 
        }
    } catch(err) {
        return err
    }
}


const loginUser = async (data) => {
    try {
        const response = await axiosAuth.post("/users/login", JSON.stringify(data))
        if (response) {
            return response
        }
    } catch (err) {
        return err
    }
}


const logoutUser = async (data) => {
    try {
        const response = await axiosAuth.post("/users/logout", JSON.stringify(data))
        if (response) {
            return response
        }
    } catch (err) {
        return err
    }
}


const changeUserPassword = async (data) => {
    try {
        const response = await axiosAuth.post("/users/update", JSON.stringify(data))
        if (response) {
            return response
        }
    } catch (err) {
        return err
    }
}


const resetPassword = async (data) => {
    try {
        const response = await axiosAuth.post("/users/reset", JSON.stringify(data))
        if (response) {
            return response
        }
    } catch (err) {
        return err
    }
}


const deleteUser = async (data) => {
    try {
        const response = await axiosAuth.delete("/users/", {data: JSON.stringify(data)})
        if (response) {
            return response
        }
    } catch(err) {
        console.log(err)
        return err
    }
}


const getAllReminders = async () => {
    try {
        const response = await axiosReminders.get("/reminders")
        if (response) {
            return response
        }
    } catch (err) {
        console.log(err)
        return err
    }
}


const createReminder = async (data) => {
    try {
        const response = await axiosReminders.post("/reminders", JSON.stringify(data))
        if (response) {
            return response
        }
    } catch (err) {
        console.log(err)
        return err
    }
}


const deleteReminder = async (data) => {
    try {
        const response = await axiosReminders.delete("/reminders", {data: JSON.stringify(data)})
        if (response) {
            window.location.reload();
            return response
        }
    } catch (err) {
        console.log(err)
        return err
    }
}


const editReminder = async (data) => {
    try {
        const response = await axiosReminders.patch("/reminders/update", JSON.stringify(data))
        if (response) {
            return response
        }
    } catch (err) {
        console.log(err)
        return err
    }
}


const runReminder = async (data) =>{
    const query = `?_id=${data._id}`

    try {
        const response = await axiosReminders.get("/reminders/run" + query)
        if (response) {
            window.location.reload();
            return response
        }
    } catch (err) {
        console.log(err)
        return err
    }
}


const stopReminder = async (data) => {
    const query = `?_id=${data._id}`

    try {
        const response = await axiosReminders.get("/reminders/stop" + query)
        if (response) {
            window.location.reload();
            return response
        }
    } catch (err) {
        console.log(err)
        return err
    }
}


export const api = {
    registerUser,
    loginUser,
    logoutUser,
    changeUserPassword,
    resetPassword,
    deleteUser,
    getAllReminders,
    createReminder,
    deleteReminder,
    editReminder,
    runReminder,
    stopReminder
}