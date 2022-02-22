import axios from "axios"

const BASEURL = "http://localhost:3001";
const retrieveAccessToken = () => {
    let currentUserAccessToken = undefined
    if (sessionStorage.getItem("user")) {
        currentUserAccessToken = JSON.parse(sessionStorage.getItem("user")).accessToken
    } else {
        currentUserAccessToken = undefined
    }

    return currentUserAccessToken;
}


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


axiosReminders.interceptors.request.use(config => {
    if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = "Bearer " + retrieveAccessToken()
    }
    return config
}, (error) => {
    Promise.reject(error)
})

axiosReminders.interceptors.response.use(response => response, async (error) => {
    const prevRequest = error?.config;

    if (error?.response?.status === 403 && !prevRequest?.sent) {
        console.log("Refreshing access token...")
        prevRequest.sent = true
        const user = JSON.parse(sessionStorage.getItem("user"))
        
        const axiosConfig = {headers: { "Content-Type": "application/json" }, withCredentials: true}
        const axiosBody = { userId: user.userId }
        try {
            const response = await axios.post(BASEURL + "/users/refresh", axiosBody, axiosConfig)

            const sessionItems = {
                accessToken: response.data.accessToken,
                userId: user.userId,
                username: user.username
            }
            sessionStorage.setItem("user", JSON.stringify(sessionItems))
    
            prevRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
            return axiosReminders(prevRequest)
        } catch(err) {
            return err
        }
    }
    return Promise.reject(error)
})


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