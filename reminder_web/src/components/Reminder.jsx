import React, {useState, useCallback} from "react";
import { ReminderDetails } from "./ReminderDetails";

export const Reminder = (props) => {
    const [expandState, setExpandState] = useState(false);
    const [expand, setExpand] = useState();

    const handleClick = useCallback(() => {
        if (expandState) {
            setExpandState(false)
            setExpand();
        } else {
            setExpandState(true);
            setExpand(<ReminderDetails data={props.data}/>)
        }
    }, [expandState, expand])

    return (
        <div className="reminder" >
            <div onClick={handleClick}>
                <h3 className="reminderTitle">{props.data.title}</h3>
            </div>
            {expand}
        </div>
    )
}