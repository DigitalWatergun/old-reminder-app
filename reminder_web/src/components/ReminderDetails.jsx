import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditReminderPopup } from "./EditReminderBox";
import { api } from "../api/api";

export const ReminderDetails = (props) => {
    const [editPopup, setEditPopup] = useState(false)
    const navigate = useNavigate();
    
    const handleRunClick = async () => {
        await api.runReminder(props.data);
    }


    const handleStopClick = async () => {
        const result = await api.stopReminder(props.data);
        console.log(result);
    }


    const handleEditClick = () => {
        // setEditPopup(!editPopup)
        // console.log(props)
        navigate("/reminders/edit", { state: {data: props.data }})
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
                            <td className="field">Content:</td>
                            <td>{props.data.content}</td>
                        </tr>
                        <tr>
                            <td className="field">Status:</td>
                            <td>{props.data.status}</td>
                        </tr>
                    </tbody>
                </table>
                <br/>                
            </div>
            <button className="reminderRunButton" onClick={handleRunClick} disabled={props.data.status === "ACTIVE"}>RUN</button>
            <button className={props.data.status === "ACTIVE" ? "reminderGrayButton" : "reminderGrayButtonDisabled"} onClick={handleStopClick} disabled={props.data.status === "INACTIVE"}>STOP</button>
            <button className={props.data.status === "ACTIVE" ? "reminderGrayButtonDisabled" : "reminderGrayButton"} onClick={handleEditClick} disabled={props.data.status === "ACTIVE"}>EDIT</button>
            <button className={props.data.status === "ACTIVE" ? "reminderGrayButtonDisabled" : "reminderGrayButton"} style={{paddingLeft: "10px"}} onClick={handleDeleteClick} disabled={props.data.status === "ACTIVE"}>DELETE</button>
            {editPopup && <EditReminderPopup content={props.data} handleClose={handleEditClick}/>}
        </div>

    )
}