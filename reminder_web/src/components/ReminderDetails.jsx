import React from "react";

export const ReminderDetails = (props) => {

    const handleDeleteClick = () => {
        const fetchOptions = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(props.data)
        }
        fetch("http://localhost:3001/reminders", fetchOptions)
        .then(response => {
            if (response.ok) {
                console.log("Response is okay.")
                window.location.reload();
            } else {
                console.log("Response code is not okay.")
                throw Error()
            }
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <div>
            <p>Content: {props.data.content}</p>
            <p>Status: {props.data.status}</p>
            <button>RUN</button>
            <button>STOP</button>
            <button>EDIT</button>
            <button onClick={handleDeleteClick}>DELETE</button>
        </div>
    )
}