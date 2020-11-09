const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const Shop = require('../../models/Shop');
const User = require('../../models/User');
const Seller = require('../../models/Seller');
const Product = require('../../models/Product');
const path = require ('path');
const fs= require('fs');

// @route  GET  api/shop/me
// @desc   current seller shop
// @access Private

router.get('/me', auth, async function (req, res) {
  try {
    const shop = await Shop.findOne({
      seller: req.user.id,
    }).populate('seller', ['name', 'email']);

    if (!shop) {
      const isUser = await User.findOne({ _id: req.user.id });
      console.log(req.user.id);
      return isUser
        ? res.status(401).json({
            errors: [{ msg: "you are a simple user you can't have a shop" }],
          })
        : res.status(400).json({ msg: "you haven't a shop yet" });
    }
    return res.json(shop);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @route  POST  api/shop
// @desc   Create or update a shop
// @access Private

router.post(
  '/',
  [
    auth,

    [
      check('nameofshop', 'Enter a name for your shop').not().isEmpty(),
      check('telephone', 'Enter a telephone number').not().isEmpty(),
      check('fieldofbusiness', 'Enter your field of business').not().isEmpty(),
      check('emailofbusiness', 'Email of Business is required').isEmail(),
      check('adress', 'Adress is required').not().isEmpty(),
      check('country', 'Country is required').not().isEmpty(),
      check('description', 'description is required').not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const isUser = await User.findOne({ _id: req.user.id });
    if (isUser) {
      return res.status(401).json({
        errors: [
          { msg: 'you are a simple user ! you can not create a shop !' },
        ],
      });
    }
    const {
      nameofshop,
      emailofbusiness,
      adress,
      country,
      telephone,
      fieldofbusiness,
      logo,
      description,
    } = req.body;

    const shopFields = {};

    shopFields.seller = req.user.id;
    if (nameofshop) shopFields.nameofshop = nameofshop;
    if (telephone) shopFields.telephone = telephone;
    if (fieldofbusiness) shopFields.fieldofbusiness = fieldofbusiness;

    if (emailofbusiness) shopFields.emailofbusiness = emailofbusiness;
    if (adress) shopFields.adress = adress;
    if (country) shopFields.country = country;
    if (description) shopFields.description = description;
    if (logo) shopFields.logo=logo ;

    try {
      let shop = await Shop.findOne({ seller: req.user.id });

      if (shop) {
        //update
        shop = await Shop.findOneAndUpdate(
          { seller: req.user.id },
          { $set: shopFields },
          { new: true }
        );
        return res.json(shop);
      }

      shop = new Shop(shopFields);

      await shop.save();

      return res.json(shop);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('server Error');
    }
  }
);

// @route  POST  api/shop/upload
// @desc   upload shop logo
// @access Private

router.post('/upload',auth, (req, res) => {

  if (req.files === null) {

    return res.status(400).json({ errors: [{ msg: 'no logo uploaded' }] });

  }

  const file = req.files.file;  
  
  file.mv(path.join(__dirname , `../../client/public/uploads/shops_logos/${file.name}`), err => {
 

    if (err) {

      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/shops_logos/${file.name}` });
  }) ;
});















// @route  GET  api/shop
// @desc   Get all shops
// @access Public

router.get('/', async (req, res) => {
  try {
    let shops = await Shop.find().populate('seller', [
      '_id',
      'firstname',
      'lastname',
      'email',
    ]);

    return res.json(shops);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('error server');
  }
});

// @route  GET  api/shop/seller/:seller_id
// @desc   Get shop by seller id
// @access Public

router.get('/seller/:seller_id', async (req, res) => {
  try {
    let shop = await Shop.findOne({
      seller: req.params.seller_id,
    }).populate('seller', ['name', 'email']);
    if (!shop)
      return res
        .status(400)
        .json({ errors: [{ msg: "this user don't have a shop ! " }] });

    return res.json(shop);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ errors: [{ msg: "this user don't have profile ! " }] });
    }
    return res.status(500).send('error server');
  }
});

// @route  DELETE  api/shop
// @desc   Delete a shop and a seller
// @access Private

router.delete('/', auth, async (req, res) => {
  try {
    await Product.deleteMany({ seller: req.user.id });
    // remove profile
    await Shop.findOneAndDelete({ seller: req.user.id });

    // remove user
    await Seller.findByIdAndDelete({ _id: req.user.id });
    return res.json({ msg: 'Seller & Shop removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server errror');
  }
});

module.exports = router;
