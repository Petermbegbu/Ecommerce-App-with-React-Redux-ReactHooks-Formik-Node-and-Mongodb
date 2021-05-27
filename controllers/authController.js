const jwt = require("jsonwebtoken");
const User = require("../models/User");
const handleAuthErrors = require("../errors/authError");

//Create json web token
const createToken = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY, { expiresIn: 3 * 24 * 60 * 60 });
    return token;
}


module.exports.signup_post = async (req, res) => {
    
    try {
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie("myCookieToken", token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(201).json({user});
    } catch(error){
        const errorMessages = handleAuthErrors(error)
        res.json({errorMessages});
    }
}



module.exports.signin_post = async (req, res) => {
   const {email, password} = req.body;

   try {
        const user = await User.login(email, password);

        //if the async code is successfull we create a token and then pass it to the user browser;
        const token = createToken(user._id);
        res.cookie("myCookieToken", token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });
        res.status(201).json({user});  

    } catch(error) {
        const errorMessages = handleAuthErrors(error)
        res.json({errorMessages});
    }
}


module.exports.logout_get = (req, res) => {
    //we can't delete the cookies in the server but we can set it to empty string and then
    //set the maxAge to a short time like 1 second; 
    res.cookie("myCookieToken", "", {maxAge: 1 * 1000});
    res.json({message: "success"});
}

//for checking current user
module.exports.currentUser = (req, res) => {
    const token = req.cookies.myCookieToken;

    //check if token exist and is verified
    if(token){
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decodedToken) => {
            if(error){
                res.json({message: "redirect"});
            } else {
                const user = await User.findById(decodedToken.id);
                res.json({user});
            }
        })
    } else {
        res.json({message: "redirect"});
    }
}