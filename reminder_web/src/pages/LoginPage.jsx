import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { api } from "../api/api"

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }


    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }


    const handleSubmit = async event => {
        const data = {"username": username, "password": password}
        const response = await api.loginUser(data)
        if (response) {
            const stringResponse = JSON.stringify(response);
            sessionStorage.setItem("user", stringResponse)
            navigate("/reminders")
        }
    }


    return (
        <HeaderFooter userState={false} user={undefined}>
            Login
            <div>
                <table className="loginForm">
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td><input name="username" type="text" onChange={handleUsernameChange}/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input name="password" type="password" onChange={handlePasswordChange}/></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleSubmit}>Sign In</button>
            </div>
        </HeaderFooter>
    )
}