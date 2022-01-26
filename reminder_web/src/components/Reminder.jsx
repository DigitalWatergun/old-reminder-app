import React, {useState} from "react";

export const Reminder = (props) => {
    const [expand, setExpand] = useState(false);

    return (
        <div className="reminder">
            <h3>{props.data.title}</h3>
            <p>{props.data.content}</p>
        </div>
    )
}