import React, { useState } from "react"; 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Test } from "./pages/Test"
import { Login } from "./pages/LoginPage"
import { RemindersPage } from "./pages/RemindersPage"
import { CreateRemindersPage } from "./pages/CreateRemindersPage"
import { Settings } from "./pages/SettingsPage"
import { ChangePassword } from "./pages/ChangePasswordPage"
import { Register } from "./pages/RegisterPage"
import { ForgotPassword } from "./pages/ForgotPasswordPage";


const RequireAuth = ({children}) => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated")
    
    if (isAuthenticated) {
        return children
    } else {
        return <Navigate to="/" />
    }
}


export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/reminders/" element={<RequireAuth><RemindersPage/></RequireAuth>}/>
                <Route path="/reminders/create" element={<RequireAuth><CreateRemindersPage/></RequireAuth>}/>
                <Route path="/settings" element={<RequireAuth><Settings/></RequireAuth>}/>
                <Route path="/settings/password" element={<RequireAuth><ChangePassword/></RequireAuth>}/>
                <Route path="/forgotpassword" element={<ForgotPassword/>} />
            </Routes>
        </BrowserRouter>
    )
}