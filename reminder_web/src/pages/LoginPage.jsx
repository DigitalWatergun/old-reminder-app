import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { api } from "../api/api"
import image from "../static/sticky.png"

export const Login = () => {
    const [formData, setFormData] = useState({})
    const [active, setActive] = useState(undefined);
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();


    const handleChange = event => {
        setError(undefined)
        const name = event.target.name
        const value = event.target.value

        setFormData(items => {
            return {... items, [name]:value}
        })
    }


    const handleSubmit = async () => {
        const data = {"username": formData.username, "password": formData.password, "registerHash": formData.registerHash}
        const response = await api.loginUser(data)
        if (response.status === 200) {
            const stringResponse = JSON.stringify(response.data);
            sessionStorage.setItem("user", stringResponse)
            sessionStorage.setItem("isAuthenticated", true)
            navigate("/reminders")
        } else if (response.response.status === 401) {
            setError(response.response.data)
            setActive(
                <tr>
                    <td>Activation Code: </td>
                    <td><input name="registerHash" type="text" onChange={handleChange}></input></td>
                </tr>
            )
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
                        {active}
                    </tbody>
                </table>
                <div className="errorText">{error}</div>
                <button onClick={handleRegisterClick}>Register</button>
                <button onClick={handleSubmit}>Sign In</button>
            </div>
        </HeaderFooter>
    )
}