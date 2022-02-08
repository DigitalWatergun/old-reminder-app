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
        // console.log(JSON.parse(user))

        const response = await api.getAllReminders(user)
        setReminders(response);
    };


    useEffect(callBackendAPI, []);

    return (
        <HeaderFooter>
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