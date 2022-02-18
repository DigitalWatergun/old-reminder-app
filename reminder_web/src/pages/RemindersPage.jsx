import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { Reminder } from "../components/Reminder";
import { HeaderFooter } from "../components/HeaderFooter";
import { api } from "../api/api"

export const RemindersPage = () => {
    const [reminders, setReminders] = useState([]);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const navigate = useNavigate();

    
    const callBackendAPI = async () => {
        console.log("Calling backend Reminders API...");

        const response = await api.getAllReminders()
        if (response.status === 200) {
            setReminders(response.data)
        } else {
            console.log("No reminders found")
        }
    }

    
    const handleCreateClick = () => {
        navigate("/reminders/create")
    }


    useEffect(callBackendAPI, []);

    return (
        <HeaderFooter userState={true} user={user}>
            <h2 className="pageHeading">My Reminders</h2>
            {reminders.map((reminders, index) => {
                return <Reminder key={index} data={reminders} />
            })}
            <button style={{margin: "5 auto", }} className="reminderCreateButton" onClick={handleCreateClick}>Create Reminder</button>
        </HeaderFooter>
    )
}