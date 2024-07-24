import Category from "../models/Category.js";

export const getAllCategory = async (req, res) => {
  try {
    const data = await Category.find();
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
    const data = await Category.findById(req.params.id);
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Get category by Id successfull",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createCategory = async (req, res) => {
  try {
    const data = await Category.create(req.body);
    return res.status(201).json({
      success: true,
      data,
      message: "Create Category successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoryById = async (req, res) => {
  try {
    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(201).json({
      success: true,
      data,
      message: "Update Category successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

export const RemoveCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      success: true,
      data,
      message: "Remove Category successfull",
    });
  } catch (error) {
    console.log(error);
  }
};
