

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


const validatePassword = (pass) => {
    if (pass.match(/[a-z]/g) && pass.match(
        /[A-Z]/g) && pass.match(
        /[0-9]/g) && pass.match(
        /[^a-zA-Z\d]/g) && pass.length >= 8 && pass.length <=32)
        return true;
    else
        return false;
}


const validateMobile = (mobile) => {
    return /^\d{10}$/.test(mobile)
}

const validateReminderForm = (formData) => {
    const result = {}

    switch (true) {
        case !formData.title:
            result["error"] = "Title of reminder cannot be blank"
            result["status"] = false
            break
        case !formData.dateEnable && !formData.repeatEnable: 
            result["error"] = "Please enter a date or a timer"
            result["status"] = false
            break         
        case formData.dateEnable && !formData.date: 
            result["error"] = "Please enter a date"
            result["status"] = false 
            break
        case formData.timeEnable && !formData.time:
            result["error"] = "Please enter a time"
            result["status"] = false 
            break
        case formData.repeatEnable && !formData.minutes: 
            result["error"] = "Please enter # of minutes"
            result["status"] = false 
            break 
        case formData.repeatEnable && !formData.repeat:
            result["error"] = "Please enter your repeat count"
            result["status"] = false
            break
        case formData.enableSMS && !validateMobile(formData.mobile): 
            result["error"] = "Please enter a valid mobile number"
            result["status"] = false
            break
        case formData.enableEmail && !validateEmail(formData.email):
            result["error"] = "Please enter a valid email"
            result["status"] = false 
            break
        case !formData.enableEmail && !formData.enableSMS: 
            result["error"] = "You need to enable at least email or SMS"
            result["status"] = false 
            break
        default: 
            result["status"] = true
            break
    }

    return result
}



export {
    validateEmail,
    validatePassword,
    validateMobile,
    validateReminderForm
}