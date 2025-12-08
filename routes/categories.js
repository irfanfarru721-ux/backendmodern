import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// GET categories (optional vendor filter)
router.get("/", async (req, res, next) => {
  try {
    const { vendor } = req.query;
    const filter = {};
    if (vendor) filter.vendor = vendor;
    const categories = await Category.find(filter);
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// Create category
router.post("/", async (req, res, next) => {
  try {
    const cat = await Category.create(req.body);
    res.status(201).json(cat);
  } catch (err) {
    next(err);
  }
});

export default router;
