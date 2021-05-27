
const handleProductErrors = (error) => {
    let errorMessages = {
        _user: "",
        _category: "",
        name: "",
        image: "",
        brand: "",
        description: "",
        rating: "",
        numOfReviews: "",
        price: "",
        quantity: "",
        shipping: "",
    };

    console.log("error._message", error._message)
    if(error._message == "product validation failed"){
        Object.values(error.errors).forEach(({path, message}) => {
            errorMessages[path] = message;
        })
    }

    return errorMessages;
}

module.exports = handleProductErrors;
