import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: false },
    // Which vendor this category belongs to. If null => global category (optional)
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: false }
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
