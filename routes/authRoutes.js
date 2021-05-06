const express = require("express");
const router = express.Router();

const {signup_post, signin_post, logout_get, currentUser} = require("../controllers/authController");

router.post("/signup", signup_post);

router.post("/signin", signin_post);

router.get("/logout", logout_get);

router.get("/currentUser", currentUser);



module.exports = router;