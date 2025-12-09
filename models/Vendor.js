import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
      }
    ],

    type: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    email: String,
    phone: String,
    address: String,

    isApproved: { type: Boolean, default: false },
    metadata: { type: Object }
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
