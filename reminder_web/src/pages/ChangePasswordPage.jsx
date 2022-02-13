import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading"
import { api } from "../api/api"

export const ChangePassword = () => {
    const state = useLocation()
    const [changePassword, setChangePassword] = useState(() => {
        if (state.state === null) {
            return undefined
        } else {
            return state.state.changePassword
        }
    })
    const [formData, setFormData] = useState(() => {
        if (sessionStorage.getItem("user")) {
            const user = JSON.parse(sessionStorage.getItem("user"))
            return {userId: user.userId, changePassword: user.changePassword}
        }
    })
    const [loadingState, setLoadingState] = useState(false)
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();


    const handleChange = (event) => {
        setError(undefined)
        const name = event.target.name;
        const value = event.target.value;

        setFormData(items => {
            return {... items, [name]: value}
        })
    }


    const handleUpdateClick = async (event) => {
        event.preventDefault();
        setLoadingState(true)

        if (formData.newPassword === formData.confirmNewPassword) {
            const response = await api.changeUserPassword(formData);
            if (response.status === 200) {
                sessionStorage.clear();
                navigate("/", { state: {message: "Please log in with your new password."}})
            } else {
                console.log(response)
                setLoadingState(false)
                setError(response.response.data)
            }
        } else {
            setLoadingState(false)
            setError("New passwords do not match!")
        }
    }


    return (
        <HeaderFooter>
            {loadingState? <Loading/> : 
                <div>
                    {changePassword ? <h3>Reset Password</h3> : <h3>Change Password</h3>}
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
                    <div className="errorText">{error}</div>
                    {changePassword ? <Link to="/"><button>Cancel</button></Link> : <Link to="/reminders"><button>Cancel</button></Link>}
                    <button onClick={handleUpdateClick}>Update</button>
                </div>}
        </HeaderFooter>
    )
}
