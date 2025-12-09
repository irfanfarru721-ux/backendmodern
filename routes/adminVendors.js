import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

// ADMIN: Create vendor
router.post("/", async (req, res, next) => {
  try {
    const v = await Vendor.create(req.body);
    res.status(201).json(v);
  } catch (err) {
    next(err);
  }
});

// ADMIN: Update vendor
router.put("/:id", async (req, res, next) => {
  try {
    const v = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(v);
  } catch (err) {
    next(err);
  }
});

export default router;
