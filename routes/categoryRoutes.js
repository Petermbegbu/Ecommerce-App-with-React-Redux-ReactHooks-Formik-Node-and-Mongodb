const express = require("express");
const router = express.Router();
const {isAdmin} = require("../middlewares/appMiddlewares");

const { createCategory, getAllCategories } = require("../controllers/categoryController");

router.post("/create-category", isAdmin, createCategory);

router.get("/categories", getAllCategories);

module.exports = router;