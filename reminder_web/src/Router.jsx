import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Test } from "./pages/Test"
import { Reminders } from "./pages/Reminders"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Test/>}/>
                <Route path="/reminders/" element={<Reminders/>}/>
            </Routes>
        </BrowserRouter>
    )
}