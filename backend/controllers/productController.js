const productModel = require("../models/productModel");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
    let query = {};

  if (req.query.keyword) {
    query.name = {
      $regex: req.query.keyword,
      $options: "i"  
    };
  }



  const products = await productModel.find({...query});
  res.status(200).json({
    success: true,
    products
  });
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.status(200).json({
    success: true,
    product
  });
};
