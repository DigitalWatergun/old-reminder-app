import axios from "axios"


const BASEURL = "http://localhost:3001";
let currentUserAccessToken = undefined
if (sessionStorage.getItem("user")) {
    currentUserAccessToken = JSON.parse(sessionStorage.getItem("user")).refreshToken
} else {
    currentUserAccessToken = undefined
}


const axiosAuth = axios.create({
    headers: { "Content-Type": "application/json"}
});
const axiosReminders = axios.create({
    baseURL: BASEURL,
    headers: { 
        "Authorization": "Bearer " + currentUserAccessToken,
        "Content-Type": "application/json"
    }
});


axiosReminders.interceptors.request.use( async (config) => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    const accessToken = user.accessToken
    const userId = user.userId
    const userRefreshToken = user.refreshToken

    const result = await axios.post(BASEURL + "/users/verify", {token: accessToken}, {headers: { "Content-Type": "application/json" }})
    if (!result.data) {
        console.log("Refreshing access token...")

        const axiosConfig = {headers: { "Content-Type": "application/json" }}
        const axiosBody = { userId: userId, token: userRefreshToken }
        const response = await axios.post(BASEURL + "/users/refresh", axiosBody, axiosConfig)

        config.headers.Authorization = "Bearer " + response.data.accessToken
        const sessionItems = {
            accessToken: response.data.accessToken,
            refreshToken: userRefreshToken,
            userId: userId,
            username: user.username
        }
        sessionStorage.setItem("user", JSON.stringify(sessionItems))
    } else {
        config.headers.Authorization = "Bearer " + accessToken
    }
    
    return config
}, (error) => {
    return Promise.reject(error)
})


const loginUser = async (data) => {
    try {
        const response = await axiosAuth.post(BASEURL + "/users/login", JSON.stringify(data))
        if (response) {
            return response
        }
    } catch (err) {
        return err
    }
}


const logoutUser = async (data) => {
    try {
        const response = await axiosAuth.post(BASEURL + "/users/logout", JSON.stringify(data))
        if (response) {
            return response
        }
    } catch (err) {
        return err
    }
}


const changeUserPassword = async (data) => {
    try {
        const response = await axiosAuth.post(BASEURL + "/users/update", JSON.stringify(data))
        if (response) {
            return response
        }
    } catch (err) {
        return err
    }
}


const deleteUser = async (data) => {
    try {
        const response = await axiosAuth.delete(BASEURL + "/users/", {data: JSON.stringify(data)})
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
        const response = await axiosReminders.delete(BASEURL + "/reminders", {data: JSON.stringify(data)})
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
        const response = await axiosReminders.patch(BASEURL + "/reminders/update", JSON.stringify(data))
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
    loginUser,
    logoutUser,
    changeUserPassword,
    deleteUser,
    getAllReminders,
    createReminder,
    deleteReminder,
    editReminder,
    runReminder,
    stopReminder
}