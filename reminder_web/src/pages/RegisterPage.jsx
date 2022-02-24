import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { HeaderFooter } from "../components/HeaderFooter";
import { Loading } from "../components/Loading"
import { api } from "../api/api"


const validatePassword = (pass) => {
    if (pass.match(/[a-z]/g) && pass.match(
        /[A-Z]/g) && pass.match(
        /[0-9]/g) && pass.match(
        /[^a-zA-Z\d]/g) && pass.length >= 8 && pass.length <=32)
        return true;
    else
        return false;
}


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


    const handleRegisterClick = async (e) => {
        e.preventDefault();
        setLoadingState(true)
        if ("username" in formData && "password" in formData && "email" in formData) {
            if (!formData.username.includes(" ")) {
                if (validatePassword(formData.password)) {
                    if (formData.password === formData.confirmPassword) {
                        if (formData.email.includes("@")) {
                            const response = await api.registerUser(formData);
                            if (response.status === 201) {
                                setSubmitted(true)
                            } else {
                                setLoadingState(false)
                                setError(response.response.data)
                            }
                        } else {
                            setLoadingState(false)
                            setError("Please enter a valid email address.")
                        }
                    } else {
                        setLoadingState(false)
                        setError("Passwords do not match!")
                    }
                } else {
                    setLoadingState(false)
                    setError(<div>
                        <p>The password needs to be:</p>
                        <ul style={{textAlign: "left"}}>
                            <li>Between 8 and 32 characters</li>
                            <li>Contain 1 Uppercase character</li>
                            <li>Contain 1 Lowercase character</li>
                            <li>Contain 1 Number</li>
                            <li>Contain 1 special character</li>
                        </ul>
                    </div>)
                }
            } else {
                setLoadingState(false)
                setError("Username cannot have spaces.")
            }
        } else {
            setLoadingState(false)
            setError("There can be no blank fields")
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
                                <label>Username</label>
                                <input name="username" type="text" onChange={handleChange}></input><br/><br/>
                                <label>Password</label>
                                <input name="password" type="password" onChange={handleChange}></input><br/><br/>
                                <label>Confirm Password</label>
                                <input name="confirmPassword" type="password" onChange={handleChange}></input><br/><br/>
                                <label>Email Address</label>
                                <input name="email" type="email" onChange={handleChange}></input><br/><br/>
                                <div className="errorText">{error}</div><br/>
                                <button className="buttonGray" onClick={handleCancelClick} type="button">Cancel</button>
                                <button className="buttonOrange" style={{float: "right"}} onClick={handleRegisterClick}>Register</button>
                            </form>
                        </div>
                    </div>}
            </HeaderFooter>
        )
    }
}