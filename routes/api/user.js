const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const { check, validationResult } = require('express-validator');

let User = require('../../models/User');
let Seller = require('../../models/Seller');

// @route  POST api/users
// @desc   register
// @access Public

router.post(
  '/',
  [
    check('lastname', 'LastName is required').not().isEmpty(),
    check('firstname', 'FirstName is required').not().isEmpty(),

    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more caracters'
    ).isLength({ min: 6 }),
  ],

  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { lastname, firstname, email, password } = req.body;

    const isSeller = await Seller.findOne({ email });
    if (isSeller) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'you are already registred as a seller!' }] });
    }

    try {
      //check if user exist

      await User.findOne({ email }).then((user) => {
        if (user)
          return res
            .status(400)
            .json({ errors: [{ msg: 'user already exists' }] });
      });

      const newUser = new User({
        lastname,
        firstname,
        email,
        password,
      });

      // Create salt & hash

      await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              { id: user.id },
              process.env.jwtSecret,
              { expiresIn: 7200 },
              (err, token) => {
                if (err) throw err;
                return res.json({
                  token,

                  user: {
                    id: user.id,
                    name: user.firstname + ' ' + user.lastname,
                    email: user.email,
                  },
                });
              }
            );
          });
        });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('server Error');
    }
  }
);

module.exports = router;
