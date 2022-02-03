
const onlyLettersAndNumbers = string => {
    return /^[A-Za-z\d\s.]*$/.test(string);
}

const onlyNumbers = string => {
    return /^[\d]*$/.test(string);
}

const bodyValidator = body => {
    for (const [key, value] of Object.entries(body)) {
        if (key === "title" || key === "content") {
            if (!onlyLettersAndNumbers(value)) {
                return false;
            }

            if (value.length === 0) {
                return false;
            }
        }

        if (key === "mobile") {
            if (!value.length === 10) {
                return false
            }

            if (!onlyNumbers(value)) {
                return false 
            }
        }

        if (key === "email") {
            if (!value.includes("@")) {
                return false 
            }
        }
    }

    return true 
}

export { bodyValidator }