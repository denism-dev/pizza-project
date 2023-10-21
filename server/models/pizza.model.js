const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pizzaType: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Pizza', pizzaSchema);
