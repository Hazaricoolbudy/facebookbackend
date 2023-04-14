const jwt = require("jsonwebtoken");
const token_secret = "heyhowu";

exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, token_secret, { expiresIn: expired });
};
