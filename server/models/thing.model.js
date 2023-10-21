const mongoose = require('mongoose');

const thingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    validate: {
      validator: function (value) {
        return !/cake/i.test(value);
      },
      message: 'Thing name cannot contain the word "cake".',
    },
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Thing', thingSchema);