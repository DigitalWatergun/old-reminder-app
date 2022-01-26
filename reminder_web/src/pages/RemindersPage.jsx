import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { Reminder } from "../components/Reminder";

export const RemindersPage = () => {
    const [reminders, setReminders] = useState([]);
    const [error, setError] = useState();


    const callBackendAPI = async () => {
        console.log("Calling backend Reminders API...");

        fetch("http://localhost:3001/reminders")
        .then((response) => {
            if (!response.ok) {
                console.log("RESPONSE CODE IS NOT OKAY")
                throw Error()
            } else {
                return response.json();
            }
        })
        .then((response => {
            setReminders(response)
        }))
        .catch(err => {
            console.log(err)
            console.log("THERE IS AN ERROR")
            setError(err);
        })
    };

    const handleCreateReminderClick = () => {
        return (
            <Link to="/reminders/create"/>
        )
    }

    useEffect(callBackendAPI, []);

    if (error) {
        return <div>
            <p>There is an error</p>
            <p>{error}</p>
        </div>
    } else {
        return (
            <div>
                <h1 className="title">Reminders Page</h1>
                {reminders.map((reminders, index) => {
                    return <Reminder key={index} data={reminders} />
                })}
                <Link to="/reminders/create">
                    <button onClick={handleCreateReminderClick}>Create Reminder</button>
                </Link>
            </div>
        )
    }
}