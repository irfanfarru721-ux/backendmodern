import express from "express";
import SubCategory from "../models/SubCategory.js";

const router = express.Router();

// GET subs (optional vendor/category filter)
router.get("/", async (req, res, next) => {
  try {
    const { vendor, category } = req.query;
    const filter = {};
    if (vendor) filter.vendor = vendor;
    if (category) filter.category = category;
    const subs = await SubCategory.find(filter).populate("category");
    res.json(subs);
  } catch (err) {
    next(err);
  }
});

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const sub = await SubCategory.create(req.body);
    res.status(201).json(sub);
  } catch (err) {
    next(err);
  }
});

export default router;
