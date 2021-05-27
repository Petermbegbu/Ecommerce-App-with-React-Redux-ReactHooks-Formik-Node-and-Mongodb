const express = require("express");
const router = express.Router();
const {isAdmin} = require("../middlewares/appMiddlewares");
const upload = require("../middlewares/imageUpload");
const { createProduct, getProducts, getRelatedProducts, getProductCategories } = require("../controllers/productController");

router.post("/create-product", isAdmin, upload.single("image"), createProduct);

router.get("/get/products", getProducts);

router.get("/get/products/related/:id", getRelatedProducts);

//All products with a category
router.get("/get/productCategories", getProductCategories);



module.exports = router;