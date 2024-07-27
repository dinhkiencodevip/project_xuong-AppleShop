import Category from "../models/Category.js";
import slugify from "slugify";
import Product from "../models/Product.js";
export const getAllCategory = async (req, res) => {
  try {
    const data = await Category.find({}).populate("products");
    if (!data || data.lenght === 0) {
      return res.status(404).json({
        message: "No Category",
      });
    }
    return res.status(200).json({
      success: true,
      data,
      message: "Get all Category successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");
    if (!data) {
      return res.status(404).json({
        message: "No Cateogry",
      });
    }
    return res.status(200).json({
      success: true,
      data,
      message: "Get category by Id successfull",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const slug = slugify(req.body.name, {
      replacement: "-",
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });
    const data = await Category.create(req.body);
    if (!data) {
      return res.status(404).json({
        success: true,
        data,
        message: "Create Category not successfull",
      });
    }
    return res.status(201).json({
      success: true,
      data: data,
      message: "Create Category  successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    // const { error } = CategorySchema.validate(req.body, { abortEarly: false });
    // if (error) {
    //   const errors = error.details.map((error) => error.message);
    //   return res.status(400).json({
    //     message: errors,
    //   });
    // }

    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({
        message: "Update Category not successfull",
      });
    }
    return res.status(201).json({
      success: true,
      data,
      message: "Update Category successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const RemoveCategory = async (req, res, next) => {
  try {
    if (req.params.id === "66a4b126f3fafa074ddc512d") {
      return res.status(400).json({
        message: "Khong xoa dc danh muc mac dinh",
        success: false,
      });
    }
    const data = await Category.findByIdAndDelete(req.params.id);
    const productToUpdate = await Product.find({ category: req.params.id });
    await Promise.all(
      productToUpdate.map(async (product) => {
        product.category = "66a4b126f3fafa074ddc512d";
        await product.save();
      })
    );
    if (!data) {
      return res.status(404).json({
        success: true,
        data,
        message: "Remove Category not successfull",
      });
    }
    return res.status(201).json({
      success: true,
      data,
      message: "Remove Category successfull",
    });
  } catch (error) {
    next(error);
  }
};
