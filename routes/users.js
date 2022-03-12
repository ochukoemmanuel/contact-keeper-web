const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const User = require("../models/Users");

// @route     POST api/users
// @desc      Register a user
// @access    public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please include a valiid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("User save");
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
