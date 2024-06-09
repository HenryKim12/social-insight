const User = require("../models/userModel");

const { createSecretToken } = require("../jwt/generateToken");
const bcrypt = require("bcrypt");

const env = require("dotenv")
env.config();

const createUser = async (req, res) => {
  try {
    if (!(req.body.email && req.body.password && req.body.name && req.body.username)) {
      res.status(400).send("All input is required");
    }

    // TODO: ensure password is strong (6+ characters, symbols, numbers)

    const oldUser = await User.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      articles: []
    });
    const user = await newUser.save();
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      path: "/", // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None",
    });
    console.log("cookie set succesfully");

    res.json(user);
  } catch (error) {
    console.log("Got an error", error);
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const user = await User.findOne({ email });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      domain: process.env.FRONTEND_URL, // Set your domain here
      path: "/", // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None",
    });
  
    res.json({ token });
}

module.exports = {createUser, login};