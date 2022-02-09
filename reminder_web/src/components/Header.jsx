import React, { useState, useEffect }from "react"; 
import { Profile } from "./Profile"

export const Header = (props) => {
    const [userState, setUserState] = useState(props.userState);
    const [user, setUser] = useState(props.user);
    const [profile, setProfile] = useState();

    const renderProfile = () => {
        if (userState) {
            setProfile(<Profile user={user}/>)
        } else {
            setProfile(undefined)
        }
    }

    useEffect(renderProfile, [])

    return (
        <div className="header">
            {profile}
        </div>
    )
}