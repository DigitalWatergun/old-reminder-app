import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading"
import { api } from "../api/api"

export const Register = () => {
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


    const handleRegisterClick = async () => {
        setLoadingState(true)
        if (formData.password === formData.confirmPassword) {
            const response = await api.registerUser(formData);
            if (response.status === 201) {
                setSubmitted(true)
            } else {
                setLoadingState(false)
                setError(response.response.data)
            }
        } else {
            setLoadingState(false)
            setError("Passwords do not match!")
        }
    }


    if (submitted) {
        return (
            <HeaderFooter>
                <h2 className="pageHeading">Register</h2>
                <p style={{color: "#fff"}}>An activation email has been sent to your registered email.</p>
                <Link to="/"><button className="buttonOrange" style={{float: "none"}}>Login</button></Link>
            </HeaderFooter>
        )
    } else {
        return (
            <HeaderFooter>
                {loadingState ? <Loading/> : 
                    <div>
                        <h2 className="pageHeading">Register</h2>
                        <div className="formBoxes">
                            <form className="customForm">
                                <label>Username</label><br/>
                                <input name="username" type="text" onChange={handleChange}></input><br/><br/>
                                <label>Password</label><br/>
                                <input name="password" type="password" onChange={handleChange}></input><br/><br/>
                                <label>Confirm Password</label><br/>
                                <input name="confirmPassword" type="password" onChange={handleChange}></input><br/><br/>
                                <label>Email Address</label><br/>
                                <input name="email" type="email" onChange={handleChange}></input><br/><br/>
                                <div className="errorText">{error}</div>
                                <button className="buttonCancel" onClick={handleCancelClick}>Cancel</button>
                                <button className="buttonOrange" onClick={handleRegisterClick}>Register</button>
                            </form>
                        </div>
                    </div>}
            </HeaderFooter>
        )
    }
}