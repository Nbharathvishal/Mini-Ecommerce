const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: Array,
  amount: String,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
