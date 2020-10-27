const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
require('dotenv/config');

//User Model

let Seller = require('../../models/Seller');

// @route  POST  api/authSeller
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

      await Seller.findOne({ email }).then((seller) => {
        if (!seller)
          return res
            .status(400)
            .json({ errors: [{ msg: 'email or password invalid' }] });

        //validate password

        bcrypt.compare(password, seller.password).then((isMatch) => {
          if (!isMatch)
            return res
              .status(400)
              .json({ errors: [{ msg: 'password or email invalid' }] });

          jwt.sign(
            { id: seller.id },
            process.env.jwtSecret,
            { expiresIn: 7200 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,

                seller: {
                  id: seller.id,
                  name: seller.firstname + ' ' + seller.lastname,
                  email: seller.email,
                  shop: seller.shop,
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

router.get('/seller', auth, async (req, res) => {
  try {
    await Seller.findById(req.user.id)
      .select('-password')
      .then((user) => res.json(user));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
