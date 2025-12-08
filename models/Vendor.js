import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: false }, // e.g., 'restaurant','grocery','fruits'
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    email: String,
    phone: String,
    address: String,
    isApproved: { type: Boolean, default: false },
    metadata: { type: Object }
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
