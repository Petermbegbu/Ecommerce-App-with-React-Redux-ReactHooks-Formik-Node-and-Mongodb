const Product = require("../models/Product");
const handleProductErrors = require("../errors/productError");
const fs = require("fs");

module.exports.createProduct = async (req, res) => {

    try {
        const product = await Product.create({...req.body, image: req.file.path});
        res.status(201).json({product});
    } catch(error){
        if(req.file){
            fs.unlink(req.file.path, (err) => {
                if(err){
                    console.log(err);
                }
            })
        }

        const errorMessages = handleProductErrors(error)
        res.json({errorMessages});
    }
}


module.exports.getProducts = async (req, res) => {
    //Gets an optional query string parameter
    //This gets products based on the query passed
    const order = req.query.order == "desc" ? -1 : 1;
    const sortBy = req.query.sortBy ? req.query.sortBy : "updatedAt";
    const limit = req.query.limit ? req.query.limit : "12";
    const category = req.query.category ? req.query.category : "books";

    try {
        const products = await Product.find({_category: category})
            .populate("_category")
            .sort({[sortBy]: order})
            .limit(Number(limit))
        console.log("products", products)
        // const filteredProducts = products.filter(product => product._category.name === category)
        res.status(200).send(products);
    } catch(error){
        res.status(404).json({errorMessages: error});
    }
}


module.exports.getRelatedProducts = async (req, res) => {
    //Gets a required route parameter
    //This gets related products based on the category and excluding the current product
    const id = req.params.id;
    const categoryName = req.params.categoryName;
    const order = req.query.order == "desc" ? -1 : 1;
    const limit = req.query.limit ? req.query.limit : "4";
    const sortBy = req.query.sortBy ? req.query.sortBy : "updatedAt";

    try {
        const products = await Product.find({_id: {$ne: id}, _category: categoryName})
            .populate("_category", "_id name")
            .sort({[sortBy]: order})
            .limit(Number(limit))

        res.status(200).send(products);
    } catch(error){
        res.status(404).json({errorMessages: error});
    }
}


module.exports.getProductCategories = async (req, res) => {
    //Gets all products with a category
    
    try {
        const products = await Product.distinct("_category");
        
        res.status(200).send(products);
    } catch(error){
        res.status(404).json({errorMessages: error});
    }
}


