import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading"
import { api } from "../api/api"
import image from "../static/sticky.png"

export const Login = () => {
    const state = useLocation()
    const [formData, setFormData] = useState({})
    const [active, setActive] = useState(undefined)
    const [loadingState, setLoadingState] = useState(false)
    const [error, setError] = useState(() => {
        if (state.state === null) {
            return undefined
        } else {
            return state.state.message
        }
    });
    const navigate = useNavigate()


    const handleChange = event => {
        setError(undefined)
        const name = event.target.name
        const value = event.target.value

        setFormData(items => {
            return {... items, [name]:value}
        })
    }


    const handleSubmit = async () => {
        setLoadingState(true)
        const data = {"username": formData.username, "password": formData.password, "registerHash": formData.registerHash}
        const response = await api.loginUser(data)
        if (response.status === 200) {
            const stringResponse = JSON.stringify(response.data);
            sessionStorage.setItem("user", stringResponse)
            sessionStorage.setItem("isAuthenticated", true)
            navigate("/reminders")
        } else if (response.response.status === 401) {
            setLoadingState(false);
            setError(response.response.data)
            setActive(
                <tr>
                    <td>Activation Code: </td>
                    <td><input name="registerHash" type="text" onChange={handleChange}></input></td>
                </tr>
            )
        } else {
            setLoadingState(false);
            setError(response.response.data)
        }
    }



    return (
        <HeaderFooter userState={false} user={undefined}>
            {loadingState ? <Loading/> : 
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
                <div style={{fontSize: 13}}>
                    <a href="/forgotpassword">Forgot your password?</a>
                </div>
                <button style={{width: 240}} onClick={handleSubmit}>Sign In</button>
                <div style={{fontSize: 13}}>
                    Need an account? <a href="/register">Register</a>
                </div>
            </div>}
        </HeaderFooter>
    )
}