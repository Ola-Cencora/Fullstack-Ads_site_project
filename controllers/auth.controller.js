const User = require("../models/User.model");
const Session = require("../models/Session.model");
const bcrypt = require("bcryptjs");
const getImageFileType = require("../utils/getImageFileType");
const fs = require("fs");

exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";

    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string" &&
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType) &&
      phone
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(`public/uploads/${req.file.filename}`);
        return res
          .status(409)
          .send({ message: "User with this login already exists" });
      }

      const newUser = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        phone,
      });
      res.status(201).send({ message: "User created " + newUser.login });
    } else {
      res.status(400).send({ message: "Wrong input" });
      fs.unlinkSync(`public/uploads/${req.file.filename}`);
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string"
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: "Login or password incorrect" });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = { login: user.login, id: user._id };
          res.status(200).send({ message: "Login succesful" });
        } else {
          res.status(400).send({ message: "Login or password incorrect" });
        }
      }
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ login: req.session.login });
    if (user) res.status(200).json(user);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.logout = async (req, res) => {
  if (process.env.NODE_ENV !== "production") {
    try {
      await Session.deleteMany({});
      res.status(200).send({ message: "Logout successful" });
    } catch (err) {
      res.status(401).send({ message: err });
    }
  } else {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).send({ message: "Error during logout" });
        } else {
          res.status(200).send({ message: "Logout successful" });
        }
      });
    } else {
      res.status(401).send({ message: "You are not logged in" });
    }
  }
};
