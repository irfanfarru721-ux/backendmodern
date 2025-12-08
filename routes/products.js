import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET all products (query filters supported)
router.get("/", async (req, res, next) => {
  try {
    const { vendor, category, subcategory, q } = req.query;
    const filter = {};
    if (vendor) filter.vendor = vendor;
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (q) filter.name = { $regex: q, $options: "i" };

    const products = await Product.find(filter)
      .populate("vendor")
      .populate("category")
      .populate("subcategory");
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET product by id
router.get("/:id", async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id)
      .populate("vendor")
      .populate("category")
      .populate("subcategory");
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
});

// CREATE product (for admin/vendor)
router.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

export default router;
