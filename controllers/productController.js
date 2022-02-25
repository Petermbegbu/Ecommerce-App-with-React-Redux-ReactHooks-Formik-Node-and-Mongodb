const Product = require("../models/Product");
const handleProductErrors = require("../errors/productError");
const fs = require("fs");
const formidable = require("formidable");

module.exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (error, fields, files) => {
        if(error) {
            const errorMessages = handleProductErrors(error)
            res.json({errorMessages});        
        }

        const product = new Product(fields);

        if(files.image){
            product.image.data = fs.readFileSync(files.image.filepath);
            product.image.contentType = files.image.mimetype;
        }

        product.save((error, product) => {
            if(error){
                const errorMessages = handleProductErrors(error)
                res.json({errorMessages});    
            }

            res.status(201).json({product});
        });


    })

    // try {
    //     const product = await Product.create({...req.body, image: req.file.path});
    //     res.status(201).json({product});
    // } catch(error){
    //     if(req.file){
    //         fs.unlink(req.file.path, (err) => {
    //             if(err){
    //                 console.log(err);
    //             }
    //         })
    //     }

    //     const errorMessages = handleProductErrors(error)
    //     res.json({errorMessages});
    // }
}


module.exports.getProducts = async (req, res) => {
    //Gets an optional query string parameter
    //This gets products based on the query passed
    const order = req.query.order == "desc" ? -1 : 1;
    const sortBy = req.query.sortBy ? req.query.sortBy : "updatedAt";
    const limit = req.query.limit ? Number(req.query.limit) : 12;
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const category = req.query.category ? req.query.category : "60971c98b9b70e0fb8b1a194";
    const search = req.query.search ?
        {name: {$regex: req.query.search, $options: "i"}} : {};


    try {
        const count = await Product.countDocuments({_category: category, ...search});

        const products = await Product.find({_category: category, ...search})
            .select("-image")
            .populate("_category")
            .sort({[sortBy]: order})
            .skip(skip)
            .limit(limit)

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({products, totalPages});
    } catch(error){
        res.status(404).json({errorMessages: error});
    }
}



module.exports.getSingleProduct = async (req, res) => {
    //Gets a required route parameter
    const id = req.params.id;
    const limit = req.query.limit ? req.query.limit : "4";

    try {
        const product = await Product.findById(id)
            .select("-image")   
            .populate("_category", "_id name")

        res.status(200).send(product);
    } catch(error){
        res.status(404).json({errorMessages: error});
    }
}


module.exports.getProductImage = async (req, res) => {
    //Gets a required route parameter
    const id = req.params.id;

    try {
        const product = await Product.findById(id)
        console.log("product", product)
        if(product.image.data){
            res.set("Content-Type", product.image.contentType);
            res.send(product.image.data);
        }
    } catch(error){
        res.status(404).json({errorMessages: error});
    }
}


module.exports.getRelatedProducts = async (req, res) => {
    //Gets a required route parameter
    //This gets related products based on the category and excluding the current product
    const productId = req.params.productId;
    const categoryName = req.params.categoryName;
    const order = req.query.order == "desc" ? -1 : 1;
    const limit = req.query.limit ? req.query.limit : "4";
    const sortBy = req.query.sortBy ? req.query.sortBy : "updatedAt";

    try {
        const products = await Product.find({_id: {$ne: productId}, _category: categoryName})
            .populate("_category", "_id name")
            .sort({[sortBy]: order})
            .limit(Number(limit))
        console.log("products", products)
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




