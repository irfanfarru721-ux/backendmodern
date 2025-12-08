import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

// GET all vendors (optional type)
router.get("/", async (req, res, next) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) filter.type = type; // expecting vendor.type (e.g., 'restaurant','grocery','fruits')
    const vendors = await Vendor.find(filter);
    res.json(vendors);
  } catch (err) {
    next(err);
  }
});

// GET single vendor
router.get("/:id", async (req, res, next) => {
  try {
    const v = await Vendor.findById(req.params.id);
    if (!v) return res.status(404).json({ message: "Not found" });
    res.json(v);
  } catch (err) {
    next(err);
  }
});

export default router;
