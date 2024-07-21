import mongoose from "mongoose";

const productShema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number },
    quantity: { type: Number },
    images: { type: String },
    description: { type: String },
    category: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Product", productShema);
