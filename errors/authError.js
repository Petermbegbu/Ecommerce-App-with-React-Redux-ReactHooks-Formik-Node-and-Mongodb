
const handleAuthErrors = (error) => {
    console.log(error)
    let errorMessages = {
        name: "",
        email: "", 
        password: "",
    };

    //login errors
    if(error.message === "Incorrect Email"){
        errorMessages.email = "The email has not been registered";
    }

    if(error.message === "Incorrect password"){
        errorMessages.password = "The password is Incorrect";
    }

    //signup errors
    if(error.code == 11000){
        errorMessages.email = "This email has already been registered";
        return errorMessages;
    }

    if(error._message == "user validation failed"){
        Object.values(error.errors).forEach(({path, message}) => {
            errorMessages[path] = message;
        })
    }

    return errorMessages;
}

module.exports = handleAuthErrors;
