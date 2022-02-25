const express = require("express");
const router = express.Router();
const {isAdmin} = require("../middlewares/appMiddlewares");
//const upload = require("../middlewares/imageUpload");
const { createProduct, getProducts, 
    getSingleProduct, getRelatedProducts,
     getProductCategories, getProductImage } = require("../controllers/productController");

router.post("/create-product", isAdmin, createProduct);

router.get("/get/products", getProducts);

router.get("/get/product/:id", getSingleProduct);

router.get("/get/product/image/:id", getProductImage);

router.get("/get/products/related/:productId/:categoryName", getRelatedProducts);

//All products with a category
router.get("/get/productCategories", getProductCategories);



module.exports = router;