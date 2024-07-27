import Joi from "joi";

export const productShema = Joi.object({
  title: Joi.string().required().min(6).messages({
    "String.base": "Title must be a string",
    "String.empty": "Title cannot be empty",
    "String.min": "Title must have at least 6 characters",
  }),
  price: Joi.number().required().min(0).messages({
    "String.base": "Price must be a number",
    "String.empty": "Price cannot be empty",
    "String.min": "Price minium value is 0 ",
  }),
  quantity: Joi.number().min(1).messages({
    "String.base": "quantity must be a number",
    "String.min": "quantity must have at least 1 characters",
  }),
  description: Joi.string().messages({
    "String.base": "Description must be a string",
  }),
  images: Joi.string().messages({
    "String.base": "Images must be a string",
  }),
  categoryId: Joi.string().messages({
    "String.base": "Category must be a string",
  }),
});
