const { sendVarificationEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  console.log(req.body);
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "invalid email address" });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "this email is already register go with login",
      });
    }
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        massage:
          "minium lenth of your name should be 3 character and not exceed to 30 character",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        massage:
          "minium lenth of your name should be 3 character and not exceed to 30 character",
      });
    }
    if (!validateLength(password, 8, 30)) {
      return res.status(400).json({
        massage: "password should be more than 8 character",
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVarificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `http://localhost:3000/activate/${emailVerificationToken}`;
    sendVarificationEmail(user.email, user.first_name, url);

    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Sucess !Please activate your email to start",
    });
  } catch (error) {
    res.send("somthing went wrong");
  }
};
