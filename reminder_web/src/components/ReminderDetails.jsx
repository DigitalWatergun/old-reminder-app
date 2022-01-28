import React from "react";

export const ReminderDetails = (props) => {
    return (
        <div>
            <p>Content: {props.data.content}</p>
            <p>Status: {props.data.status}</p>
            <button>STOP</button>
            <button>RUN</button>
            <button>EDIT</button>
        </div>
    )
}