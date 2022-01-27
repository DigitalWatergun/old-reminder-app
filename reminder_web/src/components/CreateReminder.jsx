import React, { useState } from "react"; 


const TimeInput = (props) => {
    const dateCheckBox = document.getElementsByName("dateEnable")[0]
    dateCheckBox.checked = true

    return (
        <input name="time" type="time" onChange={props.onInputChange}/>
    )
}


export const CreateReminder = () => {
    const [formData, setFormData] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        let value; 

        if (name === "dateEnable") {
            value = event.target.checked;
        } else {
            value = event.target.value;
        }

        if (name === "timeEnable") {
            value = event.target.checked
            setFormData(items => {
                return {...items, ["dateEnable"]: true}
            })
        }

        setFormData(items => {
            return {... items, [name]: value}
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
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
                            <input name="dateEnable" type="checkbox" onChange={handleChange}/>
                            {formData.dateEnable | formData.timeEnable ? <input name="date" type="date" onChange={handleChange}/> : null}
                        </td>
                    </tr>
                    <tr>
                        <td>Time:</td>
                        <td>
                            <input name="timeEnable" type="checkbox" onChange={handleChange}/>
                            {formData.timeEnable ? <TimeInput onInputChange={handleChange}/> : null}
                        </td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><input name="email" type="email" value={formData.email || ''} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>SMS:</td>
                        <td><input name="mobile" type="tel" value={formData.mobile || ""} onChange={handleChange}/></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}