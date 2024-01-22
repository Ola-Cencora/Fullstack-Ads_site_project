const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { login, password, avatar, phone } = req.body;

    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string" &&
      avatar &&
      typeof avatar === "string" &&
      phone
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        return res
          .status(409)
          .send({ message: "User with this login already exists" });
      }

      const newUser = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar,
        phone,
      });
      res.status(201).send({ message: "User created " + newUser.login });
    } else {
      res.status(400).send({ message: "Wrong input" });
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
