import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { api } from "../api/api"

export const Register = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(undefined);
    const navigate = useNavigate();

    
    const handleChange = (event) => {
        setError(undefined)
        const name = event.target.name
        const value = event.target.value

        setFormData(items => {
            return {... items, [name]:value}
        })
    }


    const handleCancelClick = () => {
        navigate("/")
    }


    const handleRegisterClick = async () => {
        if (formData.password === formData.confirmPassword) {
            const response = await api.registerUser(formData);
            if (response.status === 201) {
                setSubmitted(true)
            } else {
                setError(response.response.data)
            }
        } else {
            setError("Passwords do not match!")
        }
    }


    if (submitted) {
        return (
            <HeaderFooter>
                <h3>Register</h3>
                <p>An activation email has been sent to your registered email.</p>
                <Link to="/"><button>Login</button></Link>
            </HeaderFooter>
        )
    } else {
        return (
            <HeaderFooter>
                <h3>Register</h3>
                <div>
                    <table className="userForm">
                        <tbody>
                            <tr>
                                <td>Username:</td>
                                <td><input name="username" type="text" onChange={handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input name="password" type="password" onChange={handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Confirm Password:</td>
                                <td><input name="confirmPassword" type="password" onChange={handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td><input name="email" type="email" onChange={handleChange}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="errorText">{error}</div>
                    <button onClick={handleCancelClick}>Cancel</button>
                    <button onClick={handleRegisterClick}>Register</button>
                </div>
            </HeaderFooter>
        )
    }
}