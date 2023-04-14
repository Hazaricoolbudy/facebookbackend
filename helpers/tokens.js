const jwt = require("jsonwebtoken");

exports.generateToken = (payload, expired) => {
  console.log("token secret=" + process.env.TOKEN_SECRET);
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: expired });
};
