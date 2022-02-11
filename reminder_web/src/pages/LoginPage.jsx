import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { api } from "../api/api"
import image from "../static/sticky.png"

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();


    const handleChange = event => {
        setError(undefined)
        const name = event.target.name; 
        const value = event.target.value;

        if (name === "username") {
            setUsername(value)
        }

        if (name === "password") {
            setPassword(value)
        }
    }


    const handleSubmit = async () => {
        const data = {"username": username, "password": password}
        const response = await api.loginUser(data)
        if (response.status === 200) {
            const stringResponse = JSON.stringify(response.data);
            sessionStorage.setItem("user", stringResponse)
            navigate("/reminders")
        } else {
            setError(response.response.data)
        }
    }


    const handleRegisterClick = () => {
        navigate("/register")
    }


    return (
        <HeaderFooter userState={false} user={undefined}>
            <div>
                <img style={{marginTop: 15}} width="120" height="100" src={image}></img>
                <table className="userForm">
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td><input name="username" type="text" onChange={handleChange}/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input name="password" type="password" onChange={handleChange}/></td>
                        </tr>
                    </tbody>
                </table>
                <div className="errorText">{error}</div>
                <button onClick={handleRegisterClick}>Register</button>
                <button onClick={handleSubmit}>Sign In</button>
            </div>
        </HeaderFooter>
    )
}