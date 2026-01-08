const express = require("express");
const router = express.Router();

const { getProducts, getProductById } = require("../controllers/productController");

// GET all products

router.route("/products").get(getProducts);

// GET single product
router.route("/products/:id").get(getProductById);

module.exports = router;
