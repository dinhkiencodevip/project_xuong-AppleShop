import mongoose from "mongoose";

const productShema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number },
    images: { type: String },
    description: { type: String },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Product", productShema);
