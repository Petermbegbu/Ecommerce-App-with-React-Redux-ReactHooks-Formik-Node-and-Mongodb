const express = require("express");
const router = express.Router();
const {isAdmin} = require("../middlewares/appMiddlewares");
const { getAllAdminUsers } = require("../controllers/usersController");

router.get("/adminUsers", isAdmin, getAllAdminUsers);

module.exports = router;