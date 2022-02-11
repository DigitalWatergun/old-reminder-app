import React from "react";
import { useNavigate } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { api } from "../api/api"

export const Settings = () => {
    const navigate = useNavigate();


    const handleChangePasswordClick = () => {
        navigate("/settings/password")
    }


    const handleDeleteClick = async () => {
        const userId = JSON.parse(sessionStorage.getItem("user"))["userId"]
        const data = { userId: userId}
        await api.deleteUser(data)
        sessionStorage.clear();
        navigate("/")
    }


    return (
        <HeaderFooter>
            <h2>Settings</h2>
            <div>
                <button onClick={handleChangePasswordClick}>Change Password</button>    
            </div>
            <div>
                <button onClick={handleDeleteClick}>Delete Account</button>
            </div>
        </HeaderFooter>
    )
}