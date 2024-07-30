import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find().populate("categoryId");
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Get all product successfull",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getProductbyId = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate("categoryId");
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Get product by Id successfull",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    const updateCategory = await Category.findByIdAndUpdate(
      data.categoryId,
      {
        $push: { products: data._id },
      },
      { new: true }
    );
    if (data && updateCategory) {
      return res.status(201).json({
        success: true,
        data,
        message: "Thêm sản phẩm thành công!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data) {
      return res.status(201).json({
        success: true,
        data,
        message: "Update sản phẩm thành công",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const RemoveProduct = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(201).json({
        success: true,
        data,
        message: "Xóa sản phẩm thành công!",
      });
    }
  } catch (error) {
    next(error);
  }
};
