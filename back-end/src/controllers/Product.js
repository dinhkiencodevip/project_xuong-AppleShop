import Product from "../models/Product.js";

export const getAllProduct = async (req, res, next) => {
  try {
    const data = await Product.find();
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
    const data = await Product.findById(req.params.id);
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
    if (data) {
      return res.status(201).json({
        success: true,
        data,
        message: "Create product successfull",
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
        message: "Update product successfull",
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
        message: "Remove product successfull",
      });
    }
  } catch (error) {
    next(error);
  }
};
