import React from "react";
import { ReminderForm } from "./ReminderForm";

export const EditReminderPopup = (props) => {

    return (
        <div className="popup-box">
            <div className="box">
                {/* <ReminderForm data={props.content}/> */}
                <p>{props.content.title}</p>
                <button onClick={props.handleClose}>CANCEL</button>
                <button>SUBMIT</button>
            </div>
        </div>
    )
}