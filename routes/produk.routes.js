const express = require("express");
const router = express.Router();

const produkController = require("../controllers/produk.controller");

// GET produk
router.get("/", produkController.getProduk);

// POST pembelian
router.post("/beli", produkController.beliProduk);

router.get("/cancel/:id", produkController.cancelPembelian);

module.exports = router;