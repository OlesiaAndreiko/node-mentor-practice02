const express = require("express");
const {validateAddUser, validateLoginUser} = require("../middlewares/userValidate");
const authenticate = require("../middlewares/authenticate");
const { signup, login, logout, current, updateAvatar} = require("../controllers/authControllers");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/signup", validateAddUser, signup);

router.post("/login",  validateLoginUser, login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, current);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar)

module.exports = router;
