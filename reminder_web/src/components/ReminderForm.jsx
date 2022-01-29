import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api"


const DateInput = (props) => {
    return (
        <input name="date" type="date" value={props.date || ""} onChange={props.onInputChange}/> 
    )
}


const TimeInput = (props) => {
    const dateCheckBox = document.getElementsByName("dateEnable")[0]
    dateCheckBox.checked = true

    return (
        <input name="time" type="time" onChange={props.onInputChange}/>
    )
}


const RepeatInput = (props) => {
    const dateCheckBox = document.getElementsByName("dateEnable")[0]
    const timeCheckBox = document.getElementsByName("timeEnable")[0]
    dateCheckBox.checked = false
    timeCheckBox.checked = false

    return (
        <div>
            <div>
            <label>Repeat Every # Minutes: </label>
            <input name="minutes" type="number" onChange={props.onInputChange}/>
            </div>
            <div>
            <label>Repeat # Many Times: </label>
            <input name="repeat" type="number" onChange={props.onInputChange}/>
            </div>
        </div>
    )
}


export const ReminderForm = (props) => {
    const [formData, setFormData] = useState(() => {
        if (props.data) {
            return props.data
        } else {
            return {}
        }
    })
    const navigate = useNavigate();


    const removeData = (item) => {
        const items = {...formData};
        for (const i of item) {
            delete items[i]
        }
        setFormData(items)
    }


    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;

        if (name === "dateEnable") {
            value = event.target.checked;
            if (!event.target.checked) {
                removeData(["date"])
            }
        }

        if (name === "timeEnable") {
            value = event.target.checked
            if (event.target.checked) {
                setFormData(items => {
                    return {...items, ["dateEnable"]: true}
                })
            } else {
                removeData(["time"])
            }
        }

        if (name === "repeatEnable") {
            value = event.target.checked;
            if (event.target.checked) {
                setFormData(items => {
                    return {...items, ["dateEnable"]: false, ["timeEnable"]: false};
                })
            } else {
                removeData(["repeatMinutes","repeat"])
            }
        }

        if (name === "enableEmail" || name === "enableSMS") {
            value = event.target.checked;
        }

        setFormData(items => {
            return {... items, [name]: value}
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        if (formData.enableSMS || formData.enableEmail) {
            const response = await api.createReminder(formData);
            if (response.ok) {
                navigate("/reminders")
            }
        } else {
            alert("You need to enable either SMS or Email")
        }
    }

    return (
        <div>
            <table className="createReminderForm">
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td><input name="title" type="text" value={formData.title || ""} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Content:</td>
                        <td><input name="content" type="text" value={formData.content || ""} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Date:</td>
                        <td>
                            <input name="dateEnable" type="checkbox" checked={formData.dateEnable || ""} onChange={handleChange} disabled={formData.repeatEnable}/>
                            {formData.dateEnable || (formData.dateEnable && formData.timeEnable) ? <DateInput  date={formData.date} onInputChange={handleChange}/>: null}
                        </td>
                    </tr>
                    <tr>
                        <td>Time:</td>
                        <td>
                            <input name="timeEnable" type="checkbox" checked={formData.timeEnable || ""} onChange={handleChange} disabled={!formData.dateEnable}/>
                            {formData.timeEnable && formData.dateEnable ? <TimeInput onInputChange={handleChange}/> : null}
                        </td>
                    </tr>
                    <tr>
                        <td>Timer:</td>
                        <td>
                            <input name="repeatEnable" type="checkbox" onChange={handleChange} disabled={formData.dateEnable | formData.timeEnable}/>
                            {formData.repeatEnable ? <RepeatInput onInputChange={handleChange}/> : null}
                        </td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>
                            <input name="enableEmail" type="checkbox" onChange={handleChange}/>
                            {formData.enableEmail ? <input name="email" type="email" onChange={handleChange}/> : null}
                        </td>
                    </tr>
                    <tr>
                        <td>SMS:</td>
                        <td>
                            <input name="enableSMS" type="checkbox" onChange={handleChange}/>
                            {formData.enableSMS ? <input name="mobile" type="tel" value={formData.mobile || ""} onChange={handleChange}/>: null}
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link to="/reminders">
                <button>Cancel</button>
            </Link>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}