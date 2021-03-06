import React from "react"; 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Error } from "./pages/Error"
import { Login } from "./pages/LoginPage"
import { RemindersPage } from "./pages/RemindersPage"
import { CreateRemindersPage } from "./pages/CreateRemindersPage"
import { EditReminderPage } from "./pages/EditReminderPage";
import { Settings } from "./pages/SettingsPage"
import { ChangePassword } from "./pages/ChangePasswordPage"
import { Register } from "./pages/RegisterPage"
import { ForgotPassword } from "./pages/ForgotPasswordPage";


const RequireAuth = ({children}) => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated")
    const changePassword = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user"))["changePassword"] : null

    if (isAuthenticated) {
        if (changePassword) {
            return <Navigate to="/resetpassword" state={{changePassword: true}}/>
        } 
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
                <Route path="/register" element={<Register/>}/>
                <Route path="/reminders/" element={<RequireAuth><RemindersPage/></RequireAuth>}/>
                <Route path="/reminders/create" element={<RequireAuth><CreateRemindersPage/></RequireAuth>}/>
                <Route path="/reminders/edit" element={<RequireAuth><EditReminderPage/></RequireAuth>}/>
                <Route path="/settings" element={<RequireAuth><Settings/></RequireAuth>}/>
                <Route path="/settings/password" element={<RequireAuth><ChangePassword/></RequireAuth>}/>
                <Route path="/forgotpassword" element={<ForgotPassword/>} />
                <Route path="/resetpassword" element={<ChangePassword/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
}