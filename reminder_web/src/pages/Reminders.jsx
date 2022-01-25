import React, { useState, useEffect } from "react"; 

export const Reminders = () => {
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


    useEffect(callBackendAPI, []);

    if (error) {
        return <div>
            <p>There is an error</p>
            <p>{error}</p>
        </div>
    } else {
        return (
            <div>
                <h1>Reminders Page</h1>
                <div>
                    {JSON.stringify(reminders)}
                </div>
            </div>
        )
    }
}