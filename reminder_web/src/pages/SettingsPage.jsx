import React from "react";
import { useNavigate } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";

export const Settings = () => {
    const navigate = useNavigate();


    const handleChangePasswordClick = () => {
        navigate("/settings/password")
    }


    return (
        <HeaderFooter>
            <h2>Settings</h2>
            <div>
                <button onClick={handleChangePasswordClick}>Change Password</button>    
            </div>
            <div>
                <button>Delete Account</button>
            </div>
        </HeaderFooter>
    )
}