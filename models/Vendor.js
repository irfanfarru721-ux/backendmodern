import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
