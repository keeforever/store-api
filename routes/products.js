const express = require("express");
const router = express.Router();

// controllers
const { getProductsStatic, getProducts } = require("../controllers/products");
// api design
// routes
router.route("/").get(getProducts);
router.route("/static").get(getProductsStatic);

module.exports = router;