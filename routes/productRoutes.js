import express from "express";
import upload from "../middleware/upload.js";
import Product from "../models/ProductModel.js";

const router = express.Router();

// ADD PRODUCT WITH IMAGE + SAVE DB
router.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const newProduct = new Product({
      name,
      price,
      category,
      image:`/images/${req.file.filename}`, // image saved name
    });

    const saved = await newProduct.save();

    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET PRODUCTS
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;