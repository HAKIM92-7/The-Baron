let mongoose = require('mongoose');
let commandSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  listofproducts: [
    {
      product: {
        type: Object,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      total_price: {
        type: Number,
        required: true,
      },
    },
  ],

  contact_infos: {
    adress_of_delivery: {
      type: String,
      required: true,
    },

    postal_code: {
      type: Number,
      required: true,
    },

    telephone: {
      type: String,
      required: true,
    },
  },

  command_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('commande', commandSchema);
