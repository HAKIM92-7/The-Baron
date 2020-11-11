const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Shop = require('../../models/Shop');
const Seller = require('../../models/Seller');
const Product = require('../../models/Product');
const path = require('path');
const fs = require ('fs');

// @route  POST  api/products
// @desc   Create a product
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Enter a title for your product').not().isEmpty(),
      check('price', 'Enter a price ').not().isEmpty(),
      check('quantity', 'Enter a quantity for this product').not().isEmpty(),
      check('category', 'Enter a category').not().isEmpty(),
      check('image1', 'upload at least 1 image').not().isEmpty(),



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
          {
            msg: 'you are a simple user ! you can not create a product !',
          },
        ],
      });
    }

    const {
      title,
      price,
      quantity,
      technicalsheet,
      description,
      category,
      image1,
      image2,
      image3,
    } = req.body;

    const productFields = {};

    const shop = await Shop.findOne({ seller: req.user.id });

    productFields.seller = req.user.id;
    productFields.shop = shop;

    if (title) productFields.title = title;
    if (price) productFields.price = price;
    if (quantity) productFields.quantity = quantity;

    if (technicalsheet) productFields.technicalsheet = technicalsheet;
    if (description) productFields.description = description;
    if (category) productFields.category = category;
    productFields.images = {};



    if (image1) productFields.images.image1 = image1;
    if (image2) productFields.images.image2 = image2;
    if (image3) productFields.images.image3 = image3;




    try {

      const product = new Product(productFields);

      await product.save();

      return res.json(product);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('server Error');
    }
  }
);

// @route  POST  api/products/upload
// @desc   upload product images
// @access Private

router.post('/upload',auth, (req, res) => {

  if (req.files === null) {

    return res.status(400).json({ errors: [{ msg: 'no file uploaded' }] });

  }

  const file = req.files.file;

  fs.readdir(path.join(__dirname , `../../client/build/public/uploads/products_images`),function(err, files) {
    if (err) {
       return console.error(err);
    }

    if (!files.includes(file.name) ) {
  file.mv(path.join(__dirname , `../../client/build/public/uploads/products_images/${file.name}`), err => {

    if (err) {

      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/products_images/${file.name}` });
  });}
}); });

// @route  PUT  api/products/:product_id
// @desc   update a product
// @access Private

router.put(
  '/:product_id',
  [
    auth,
    [
      check('title', 'Enter a title for your product').not().isEmpty(),
      check('price', 'Enter a price ').not().isEmpty(),
      check('quantity', 'Enter a quantity for this product').not().isEmpty(),
      check('category', 'Enter a category').not().isEmpty(),
      check('image1', 'enter at least 1 image for your product')
        .not()
        .isEmpty(),
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
          {
            msg: 'you are a simple user ! you can not update a product !',
          },
        ],
      });
    }
    const {
      title,
      price,
      quantity,
      technicalsheet,
      description,
      category,
      image1,
      image2,
      image3,
    } = req.body;

    const productFields = {};

    if (title) productFields.title = title;
    if (price) productFields.price = price;
    if (quantity) productFields.quantity = quantity;

    if (technicalsheet) productFields.technicalsheet = technicalsheet;
    if (description) productFields.description = description;
    if (category) productFields.category = category;
    productFields.images = {};
    if (image1) productFields.images.image1 = image1;
    if (image2) productFields.images.image2 = image2;
    if (image3) productFields.images.image3 = image3;

    try {
      const product = await Product.findById(req.params.product_id);

      if (!product) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'no product with this id !' }] });
      }

      if (product.seller.toString() !== req.user.id) {
        return res.status(400).json({
          errors: [{ msg: 'you are not the owner of this product!' }],
        });
      }

      //update
      const productUpdated = await Product.findByIdAndUpdate(
        req.params.product_id,
        { $set: productFields },
        { new: true }
      );
      return res.json(productUpdated);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('server Error');
    }
  }
);

// @route  GET  api/products/:product_id
// @desc   Get  a product by id
// @access Public

router.get('/:product_id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id);

    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'no product with this id' }] });
    }

    return res.json(product);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ errors: [{ msg: 'no product with this id' }] });
    }
    return res.status(500).json({ msg: 'error server' });
  }
});

// @route  GET  api/products/seller/:seller_id
// @desc   GET products of a seller
// @access Private

router.get('/seller/:seller_id', async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.seller_id });

    if (!products) {
      return res
        .status(404)
        .json({ errors: [{ msg: "you haven't products yet" }] });
    }

    return res.json(products);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ errors: [{ msg: 'no product for this seller ' }] });
    }
    return res.status(500).json({ msg: 'error server' });
  }
});

// @route  GET  api/myproducts/me
// @desc   current seller products
// @access Private

router.get('/myproducts/me', auth, async function (req, res) {
  try {
    const products = await Product.find({
      seller: req.user.id,
    }).populate('seller', ['name', 'email']);

    if (!products) {
      res.status(400).json({ errors: [{ msg: "you haven't products yet" }] });
    }
    return res.json(products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @route  DELETE  api/product/:product_id
// @desc   Delete a product
// @access Private

router.delete('/:product_id', auth, async (req, res) => {
  try {
    // remove profile
    let product = await Product.findById(req.params.product_id);

    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'no product with this id' }] });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(401).json({
        errors: [{ msg: 'you are not the owner of this product  !!' }],
      });
    }

    await product.remove();

    return res.json({ msg: 'product removed' });
  } catch (err) {
    console.error(err.response);
    if (err.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ errors: { msg: 'no product with this id' } });
    }
    res.status(500).send('server error');
  }
});

// @route  GET  api/products
// @desc   GET all products
// @access Public

router.get('/', async (req, res) => {
  try {
    let products = await Product.find().populate('seller', [
      '_id',
      'firstname',
      'lastname',
      'email',
    ]);

    return res.json(products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('error server');
  }
});

module.exports = router;
