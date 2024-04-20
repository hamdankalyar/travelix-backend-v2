const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-Token");
  if (!token) {
    return res.status(401).send("Access denied! No token provided");
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_TOKEN);
    // console.log("Token Id is:" + _id);
    const user = await User.findById(_id).select("-password");
    // console.log("user id is" + user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
