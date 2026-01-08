const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

exports.createOrder = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    // Calculate amount
    const amount = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    ).toFixed(2);

    // Create order
    const order = await orderModel.create({
      cartItems,
      amount,
      status: "Pending",
      createdAt: Date.now()
    });

    // Update product stock
    for (const item of cartItems) {
      const product = await productModel.findById(item.product._id);

      if (product) {
        product.stock -= item.qty;
        await product.save();
      }
    }

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Order creation failed"
    });
  }
};
