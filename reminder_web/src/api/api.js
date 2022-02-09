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
    console.log(result.data);
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
    const response = await axiosAuth.post(BASEURL + "/users/login", JSON.stringify(data))
    if (response.status === 200) {
        return response.data
    } else {
        console.log("RESPONSE CODE IS NOT OKAY")
        console.log(response.status)
        console.log(response.statusText)
        alert(response.statusText)
    }
}


const logoutUser = async (data) => {
    const response = await axiosAuth.post(BASEURL + "/users/logout", JSON.stringify(data))
    if (response.status === 200) {
        return response.data
    } else {
        console.log("RESPONSE CODE IS NOT OKAY")
        console.log(response.status)
        console.log(response.statusText)
        alert(response.statusText)
    }
}


const getAllReminders = async (data) => {
    const response = await axiosReminders.get("/reminders")
    if (response.status === 200) {
        return response.data;
    } else {
        console.log("RESPONSE CODE IS NOT OKAY")
        console.log(response.status)
        console.log(response.statusText)
        throw Error()
    }
}


const createReminder = async (data) => {
    const response = await axiosReminders.post("/reminders", JSON.stringify(data))
    if (response.status === 200) {
        return response
    } else {
        console.log("RESPONSE CODE IS NOT OKAY")
        console.log(response.status)
        console.log(response.statusText)
        alert(response.statusText)
    }
}


const deleteReminder = async (data) => {
    const response = await axiosReminders.delete(BASEURL + "/reminders", {data: JSON.stringify(data)})
    if (response.status === 200) {
        console.log("Response is okay.")
        window.location.reload();
    } else {
        console.log("Response code is not okay.")
        throw Error()
    }
}


const editReminder = async (data) => {
    const response = await axiosReminders.patch(BASEURL + "/reminders/update", JSON.stringify(data))
    if (response.status === 200) {
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

    const response = await axiosReminders.get("/reminders/run" + query)
    if (response.status === 200) {
        console.log("Response is okay.")
        window.location.reload();
    } else {
        console.log("Response code is not okay.")
        throw Error()
    }
}


const stopReminder = async (data) => {
    const query = `?_id=${data._id}`

    const response = await axiosReminders.get("/reminders/stop" + query)
    console.log(response);
    if (response.status = 200){
        window.location.reload();
        console.log("Response is ok")
        return "Response is okay"
    } else {
        console.log("Response codei s not okay.")
        throw Error();
    }
}


export const api = {
    loginUser,
    logoutUser,
    getAllReminders,
    createReminder,
    deleteReminder,
    editReminder,
    runReminder,
    stopReminder
}