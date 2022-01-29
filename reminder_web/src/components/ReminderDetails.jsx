import React, { useState } from "react";
import { EditReminderPopup } from "./EditReminderBox";
import { api } from "../api/api"

export const ReminderDetails = (props) => {
    const [editPopup, setEditPopup] = useState(false)

    const handleEditClick = () => {
        setEditPopup(!editPopup)
    }

    const handleDeleteClick = async () => {
       await api.deleteReminder(props.data)
    }

    return (
        <div>
            <table className="reminderDetailTable">
                <tbody>
                    <tr>
                        <td>Content:</td>
                        <td>{props.data.content}</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>{props.data.status}</td>
                    </tr>
                </tbody>
            </table>
            <button>RUN</button>
            <button>STOP</button>
            <button onClick={handleEditClick}>EDIT</button>
            <button onClick={handleDeleteClick}>DELETE</button>
            {editPopup && <EditReminderPopup content={props.data} handleClose={handleEditClick}/>}
        </div>
    )
}