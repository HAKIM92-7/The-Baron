const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const { check, validationResult } = require('express-validator');

let Seller = require('../../models/Seller');
let User = require('../../models/User');

// @route  POST api/seller
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

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(401).json({
        errors: [{ msg: 'you are already registred as a simple user !' }],
      });
    }

    const sellerFields = {};

    if (lastname) sellerFields.lastname = lastname;
    if (firstname) sellerFields.firstname = firstname;
    if (email) sellerFields.email = email;
    if (password) sellerFields.password = password;

    try {
      //check if user exist

      await Seller.findOne({ email }).then((seller) => {
        if (seller) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'seller already exists' }] });
        }
      });

      const newSeller = new Seller(sellerFields);

      // Create salt & hash

      await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newSeller.password, salt, (err, hash) => {
          if (err) throw err;
          newSeller.password = hash;
          newSeller.save().then((seller) => {
            jwt.sign(
              { id: seller.id },
              process.env.jwtSecret,
              { expiresIn: 7200 },
              (err, token) => {
                if (err) throw err;
                return res.json({
                  token,

                  seller: {
                    _id: seller.id,
                    name: seller.firstname + ' ' + seller.lastname,
                    email: seller.email,
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
