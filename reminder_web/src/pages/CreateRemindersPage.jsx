import React from "react";
import { ReminderForm } from "../components/ReminderForm";
import { HeaderFooter } from "../components/HeaderFooter";

export const CreateRemindersPage = () => {

    return (
        <HeaderFooter>
            <h1 className="title">Create Reminder</h1>
            <ReminderForm/>
        </HeaderFooter>
    )
}