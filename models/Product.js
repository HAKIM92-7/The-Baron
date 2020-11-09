let mongoose = require('mongoose');
let productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendeur',
  },
  shop: {
    type: Object,
  },

  title: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  technicalsheet: {
    type: String,
  },

  description: {
    type: String,
  },

  category: {
    type: String,
    required: true,
  },

  images: {
    image1: {
      type: String,
      require:true
    },
    image2: {
      type: String,
    },
    image3: {
      type: String,
    },
  },

  register_date: {
    type: Date,
    default: Date.now,
  },
 
});

module.exports = mongoose.model('produit', productSchema);
