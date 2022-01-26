import React, {useState} from "react";
import { ReminderDetails } from "./ReminderDetails";

export const Reminder = (props) => {
    const [expandState, setExpandState] = useState(false);
    const [expand, setExpand] = useState();

    const handleClick = () => {
        if (expandState) {
            setExpandState(false)
            setExpand();
        } else {
            setExpandState(true);
            setExpand(<ReminderDetails data={props.data}/>)
        }
    }

    return (
        <div className="reminder" onClick={handleClick}>
            <h3>{props.data.title}</h3>
            {expand}
        </div>
    )
}