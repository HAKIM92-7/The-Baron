const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
require('dotenv/config');

//User Model

let User = require('../../models/User');
let Seller = require('../../models/Seller');

// @route  POST  api/auth
// @desc   Auth user
// @access Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password').exists(),
  ],
  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'please enter all fields' }] });
    }
    try {
      //check if user exist

      const seller = await Seller.findOne({ email });

      await User.findOne({ email }).then((user) => {
        if (!user)
          return res
            .status(400)
            .json({ errors: [{ msg: 'email or password invalid' }] });

        //validate password

        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch)
            return res
              .status(400)
              .json({ errors: [{ msg: 'password or email invalid' }] });

          jwt.sign(
            { id: user.id },
            process.env.jwtSecret,
            { expiresIn: 7200 },
            (err, token) => {
              if (err) throw err;

              return res.json({
                token,

                user: {
                  _id: user.id,
                  name: user.firstname + ' ' + user.lastname,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('server Error');
    }
  }
);

// @route  GET  api/auth/user
// @desc   Get user
// @access Private

router.get('/user', auth, async (req, res) => {
  try {
    await User.findById(req.user.id)
      .select('-password')
      .then((user) => res.json(user));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
