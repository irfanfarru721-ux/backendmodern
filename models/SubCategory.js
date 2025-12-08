import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: false }
  },
  { timestamps: true }
);

export default mongoose.model("SubCategory", subCategorySchema);
