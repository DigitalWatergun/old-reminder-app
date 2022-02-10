import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Test } from "./pages/Test"
import { Login } from "./pages/LoginPage"
import { RemindersPage } from "./pages/RemindersPage"
import { CreateRemindersPage } from "./pages/CreateRemindersPage"
import { Settings } from "./pages/SettingsPage"
import { ChangePassword } from "./pages/ChangePassword"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/reminders/" element={<RemindersPage/>}/>
                <Route path="/reminders/create" element={<CreateRemindersPage/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/settings/password" element={<ChangePassword/>}/>
            </Routes>
        </BrowserRouter>
    )
}