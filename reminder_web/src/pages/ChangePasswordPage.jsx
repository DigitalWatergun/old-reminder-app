import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { api } from "../api/api"

export const ChangePassword = () => {
    const [formData, setFormData] = useState(() => {
        if (sessionStorage.getItem("user")) {
            const user = JSON.parse(sessionStorage.getItem("user"))
            return {userId: user.userId}
        }
    })
    const navigate = useNavigate();


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(items => {
            return {... items, [name]: value}
        })
    }


    const handleUpdateClick = async (event) => {
        event.preventDefault();

        if (formData.newPassword === formData.confirmNewPassword) {
            const response = await api.changeUserPassword(formData);
            console.log(response);
            navigate("/reminders")
        } else {
            alert("New passwords do not match!")
        }
    }


    return (
        <HeaderFooter>
            <h2>Change Password</h2>
            <table className="changePasswordTable">
                <tbody>
                    <tr>
                        <td>Current Password:</td>
                        <td><input name="currentPassword" type="password" onChange={handleChange}></input></td>
                    </tr>
                    <tr>
                        <td>New Password:</td>
                        <td><input name="newPassword" type="password" onChange={handleChange}></input></td>
                    </tr>
                    <tr>
                        <td>Confirm New Password:</td>
                        <td><input name="confirmNewPassword" type="password" onChange={handleChange}></input></td>
                    </tr>
                </tbody>
            </table>
            <Link to="/reminders"><button>Cancel</button></Link>
            <button onClick={handleUpdateClick}>Update</button>
        </HeaderFooter>
    )
}
