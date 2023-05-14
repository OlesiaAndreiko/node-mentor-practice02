const express = require("express");
const {validateAddUser, validateLoginUser} = require("../middlewares/userValidate");
const authenticate = require("../middlewares/authenticate");
const { signup, login, logout, current} = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", validateAddUser, signup);

router.post("/login",  validateLoginUser, login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, current);

module.exports = router;
