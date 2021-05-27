const User = require("../models/User");


module.exports.getAllAdminUsers = async (req, res) => {
    try {
        const adminUsers = await User.find({isAdmin: true});
        res.status(201).send(adminUsers);
    } catch(error){
        res.status(400).json({error});
    }
}



