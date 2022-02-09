import React, { useState } from "react";

export const Profile = (props) => {
    console.log(props)

    const handleClick = async (event) => {
        console.log("Clicked!")
    }

    return (
        <div>
            <div className="profile" onClick={handleClick}>
                <p>{props.user.userId}</p>
            </div>            
        </div>
    )
}