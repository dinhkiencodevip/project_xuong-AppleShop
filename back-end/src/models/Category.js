import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      defaultValue: "UnCategorized",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    // isHiden: {
    //   type: Boolean,
    //   default: false,
    // },
    slug: {
      type: String,
      unique: true,
      defaultValue: "UnCategorized",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Category", CategorySchema);
