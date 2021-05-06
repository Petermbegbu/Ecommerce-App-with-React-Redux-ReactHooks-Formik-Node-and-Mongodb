const jwt = require("jsonwebtoken");

//for checking if the user exist, if not we redirect to signin page
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.myCookieToken;

    //check if token exist and is verified
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedToken) => {
            if(error){
                console.log("verification error", error)
                res.redirect("/signin");
            } else {
                console.log("decodedToken", decodedToken);
                next();
            }
        })
    } else {
        res.redirect("/signin");
    }
}

