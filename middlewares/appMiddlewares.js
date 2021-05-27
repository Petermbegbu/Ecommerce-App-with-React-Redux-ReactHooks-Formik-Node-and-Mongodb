const jwt = require("jsonwebtoken");
const User = require("../models/User")

//for checking if the user exist, if not we redirect to signin page
module.exports.isSignedIn = (req, res, next) => {
    const token = req.cookies.myCookieToken;

    //check if token exist and is verified
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decodedToken) => {
            if(error){
                res.redirect("/signin");
            } else {
                next();
            }
        })
    } else {
        res.redirect("/signin");
    }
}


//for checking if the user is admin
module.exports.isAdmin = async (req, res, next) => {
    const token = req.cookies.myCookieToken;

    //check if token exist and is verified
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decodedToken) => {
            if(error){
                res.redirect("/signin");
            } else {
                const user = await User.findById(decodedToken.id);

                if(user.isAdmin){
                    next();
                } else {
                    res.status(403).send("Admin Resource!! Access Denied");
                }
            }
        })
    } else {
        res.redirect("/signin");
    }
}

