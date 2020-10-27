let mongoose = require('mongoose');
let shopSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendeur',
  },

  nameofshop: {
    type: String,
    required: true,
    unique: true,
  },

  emailofbusiness: {
    type: String,
    required: true,
    unique: true,
  },

  adress: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  telephone: {
    type: String,
    required: true,
  },
  fieldofbusiness: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  logo: {
    type: String,
  },

  creation_date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('shops', shopSchema);
