import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { Reminder } from "../components/Reminder";
import { HeaderFooter } from "../components/HeaderFooter";
import { api } from "../api/api"

export const RemindersPage = () => {
    const [reminders, setReminders] = useState([]);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))

    
    const callBackendAPI = async () => {
        console.log("Calling backend Reminders API...");

        const response = await api.getAllReminders()
        if (response.status === 200) {
            setReminders(response.data)
        } else {
            console.log("No reminders found")
        }
    }


    useEffect(callBackendAPI, []);

    return (
        <HeaderFooter userState={true} user={user}>
            <h1 className="title">My Reminders</h1>
            {reminders.map((reminders, index) => {
                return <Reminder key={index} data={reminders} />
            })}
            <Link to="/reminders/create">
                <button>Create Reminder</button>
            </Link>
        </HeaderFooter>
    )
}