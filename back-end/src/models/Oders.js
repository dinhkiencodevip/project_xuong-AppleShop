import mongoose, { Schema } from "mongoose";

const oderItem = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

const oderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  products: [oderItem],
  totalPrice: Number,
  vouchour: { type: String, enum: ["sale15", "sale20"] },
  status: {
    type: String,
    enum: ["pending", "shipping", "completed", "cancelled"],
    default: "pending",
  },
});
export default mongoose.model("Oder", oderSchema);
