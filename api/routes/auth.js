const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");
// REGISTER



router.post("/register", async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    // password: req.body.password

  });
  try {
    if (!req.body.password) {
      return res.status(400).json("All fields are required")
    }
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  };
});
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username
    });
    if (!user) {

      return res.status(401).json("Wrong credentials!");
    }
    const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword = hashPassword.toString(CryptoJS.enc.Utf8);


    if (OriginalPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials!");

    }
    const { password, ...others } = user._doc;

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
    },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    )

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;