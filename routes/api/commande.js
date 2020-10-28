const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Shop = require('../../models/Shop');
const User = require('../../models/User');
const Seller = require('../../models/Seller');
const Product = require('../../models/Product');
const Order = require('../../models/Commande');

// @route  POST  api/commande
// @desc   pass an order
// @access Private

router.post(
  '/',
  [
    auth,
    [
      check('listofproducts', 'list of products field  is required').notEmpty(),
      check(
        'adress_of_delivery',
        'the adress of delivery is required'
      ).notEmpty(),
      check('postal_code', 'please enter your postal code').notEmpty(),
      check('telephone', 'telephone number is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      listofproducts,
      adress_of_delivery,
      postal_code,
      telephone,
    } = req.body;

    const orderFields = {};

    orderFields.user = req.user.id;

    if (listofproducts) orderFields.listofproducts = listofproducts;

    var total = 0;

    listofproducts.map((product) => {
      total += product.total_price;
    });

    orderFields.total = total;

    orderFields.contact_infos = {};

    if (adress_of_delivery)
      orderFields.contact_infos.adress_of_delivery = adress_of_delivery;
    if (postal_code) orderFields.contact_infos.postal_code = postal_code;
    if (telephone) orderFields.contact_infos.telephone = telephone;

    try {
      const order = new Order(orderFields);

      await order.save();

      return res.json({ order, msg: 'order registred' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('server Error');
    }
  }
);

// @route  GET  api/commande/me
// @desc   get all user orders
// @access Private

router.get('/me', auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    });

    if (orders.length === 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: "your haven't pass order yet" }] });
    }
    return res.json(orders);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @route  GET  api/commande/:order_id
// @desc   Get  an order by id
// @access Private

router.get('/:order_id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.order_id);

    if (!order) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'no order with this id' }] });
    }
    if (order.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'you are not the owner of this order!!' }] });
    }

    return res.json(order);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ errors: [{ msg: 'no order with this id' }] });
    }
    return res.status(500).json({ msg: 'error server' });
  }
});

// @route  DELETE  api/commande/:order_id
// @desc   Delete an order
// @access Private

router.delete('/:order_id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.order_id);

    if (!order) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'no order with this id' }] });
    }

    if (order.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'you are not the owner of this order!!' }] });
    }

    await order.remove();

    return res.json({ msg: 'order removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res
        .status(400)
        .json({ errors: [{ msg: 'no order with this id' }] });
    }
    res.status(500).send('server errror');
  }
});

module.exports = router;
