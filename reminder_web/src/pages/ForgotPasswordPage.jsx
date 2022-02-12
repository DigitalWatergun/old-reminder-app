import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderFooter } from "../components/HeaderFooter"
import { Loading } from "../components/Loading";
import { api } from "../api/api";

export const ForgotPassword = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({})
    const [loadingState, setLoadingState] = useState(false)
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

    const handleSubmit = async () => {
        setLoadingState(true)
        const data = {"username": formData.username, "email": formData.email}
        const response = await api.resetPassword(data);
        if (response.status === 200) {
            setLoadingState(false)
            setSubmitted(true)
        } else {
            setLoadingState(false)
            setError(response.response.data)
        }
    }


    if (submitted) {
        return (
            <HeaderFooter>
                <h3>Forgot Password</h3>
                <p>An temporary password has been sent to your registered email.</p>
                <Link to="/"><button>Login</button></Link>
            </HeaderFooter>
        )
    } else {
        return (
            <HeaderFooter>
                {loadingState ? <Loading/> : 
                <div>
                    <h3>Forgot Password</h3>
                    <table className="userForm">
                        <tbody>
                            <tr>
                                <td>Username:</td>
                                <td><input name="username" type="text" onChange={handleChange}></input></td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td><input name="email" type="email" onChange={handleChange}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="errorText">{error}</div>
                    <button onClick={handleCancelClick}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>}
            </HeaderFooter>
        )
    }
}