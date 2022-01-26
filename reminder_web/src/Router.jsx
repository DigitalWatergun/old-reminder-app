import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Test } from "./pages/Test"
import { RemindersPage } from "./pages/RemindersPage"
import { CreateRemindersPage } from "./pages/CreateRemindersPage"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Test/>}/>
                <Route path="/reminders/" element={<RemindersPage/>}/>
                <Route path="/reminders/create" element={<CreateRemindersPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}