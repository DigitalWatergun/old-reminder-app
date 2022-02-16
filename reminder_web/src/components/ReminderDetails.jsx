import React, { useState } from "react";
import { EditReminderPopup } from "./EditReminderBox";
import { api } from "../api/api"

export const ReminderDetails = (props) => {
    const [editPopup, setEditPopup] = useState(false)

    
    const handleRunClick = async () => {
        await api.runReminder(props.data);
    }


    const handleStopClick = async () => {
        const result = await api.stopReminder(props.data);
        console.log(result);
    }


    const handleEditClick = () => {
        setEditPopup(!editPopup)
    }


    const handleDeleteClick = async () => {
       await api.deleteReminder(props.data)
    }


    return (
        <div>
            <div className="reminderDetail">
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
                <br/>                
            </div>
            <button className="reminderRunButton" onClick={handleRunClick} disabled={props.data.status === "ACTIVE"}>RUN</button>
            <button className="reminderGrayButton" onClick={handleStopClick} disabled={props.data.status === "INACTIVE"}>STOP</button>
            <button className="reminderGrayButton" onClick={handleEditClick}>EDIT</button>
            <button className="reminderGrayButton" style={{paddingLeft: "10px"}} onClick={handleDeleteClick}>DELETE</button>
            {editPopup && <EditReminderPopup content={props.data} handleClose={handleEditClick}/>}
        </div>

    )
}