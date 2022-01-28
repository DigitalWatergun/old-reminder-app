import React from "react";
import { CreateReminder } from "../components/CreateReminder";
import { HeaderFooter } from "../components/HeaderFooter";

export const CreateRemindersPage = () => {

    return (
        <HeaderFooter>
            <h1 className="title">Create Reminder</h1>
            <CreateReminder/>
        </HeaderFooter>
    )
}