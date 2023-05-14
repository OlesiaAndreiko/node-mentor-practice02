const jwt = require("jsonwebtoken");

const User = require("../db/models/userModel");

const HttpError = require("../helpers/HttpError");

// require("dotenv").config();
// const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

//   if (typeof authorization === "undefined") {
//     console.log(1)
//     next(HttpError(401, "Not authorized"));
//     return;
//   }
  const [bearer, token] = authorization.split(" ", 2);

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized, check it out Bearer"));
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    console.log(user)
    if (!user || !user.token || user.token !== token) {
        next(HttpError(401, "Not authorized, check it out token"));
      }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;