const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const User = require("../db/models/userModel");
const HttpError = require("../helpers/HttpError");

require("dotenv").config();

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    next(HttpError(409, "Email in use"));
    return;
  }

  const avatar = gravatar.url(email);
  const newUser = new User({ ...req.body, avatar });
  await newUser.hashPassword(password);

  const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);

  newUser.token = token;

  newUser.save();

  return res.status(201).json({ user: newUser, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    next(HttpError(401, "Email or password is wrong"));
    return;
  }

  const checkedPassword = await user.comparePassword(password);

  if (!checkedPassword) {
    next(HttpError(401, "Password is wrong"));
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "23h",
  });
  const loginUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  res.json({ user: loginUser, token: loginUser.token });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" }, { new: true });

  // res.status(204).json();
  res.sendStatus(204);
};

const current = async (req, res) => {
  const { name, email, password } = req.user;
  //  await User.
  res.status(200).json({ name, email, password });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  

  const filename = `${_id}-${originalname}`;
  const avatarUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, avatarUpload);
  const avatarUrl = path.join("avatars", filename);

  res.json({
    avatarUrl,
  });
};

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
};
