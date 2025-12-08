import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});

router.post("/", async (req, res) => {
  const vendor = await Vendor.create(req.body);
  res.json(vendor);
});

export default router;
