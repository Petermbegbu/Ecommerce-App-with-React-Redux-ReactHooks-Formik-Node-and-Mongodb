
const handleCategoryErrors = (error) => {
    let errorMessages = {
        name: "",
    };

    if(error.code == 11000){
        errorMessages.name = "The name has already been created";
        return errorMessages;
    }

    if(error._message == "category validation failed"){
        Object.values(error.errors).forEach(({path, message}) => {
            errorMessages[path] = message;
        })
    }

    return errorMessages;
}

module.exports = handleCategoryErrors;
