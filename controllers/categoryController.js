const Category = require("../models/Category");
const handleCategoryErrors = require("../errors/categoryError");

module.exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({category});
    } catch(error){
        const errorMessages = handleCategoryErrors(error);
        res.json({errorMessages});
    }
}

module.exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(201).send(categories);
    } catch(error){
        res.status(400).json({error});
    }
}



