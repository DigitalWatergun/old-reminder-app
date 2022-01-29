import React from "react";
import { api } from "../api/api"

export const ReminderDetails = (props) => {

    const handleDeleteClick = async () => {
       await api.deleteReminder(props.data)
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