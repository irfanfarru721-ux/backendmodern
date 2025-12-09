import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

// Get vendors by category + optional subcategory
router.get("/category/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    const { sub } = req.query;

    const filter = { category };

    if (sub) filter.subcategories = sub;

    const vendors = await Vendor.find(filter);
    res.json(vendors);
  } catch (err) {
    next(err);
  }
});

// Get all vendors
router.get("/", async (req, res, next) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) filter.type = type;

    const vendors = await Vendor.find(filter);
    res.json(vendors);
  } catch (err) {
    next(err);
  }
});

export default router;
