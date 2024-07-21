import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Category", CategorySchema);
