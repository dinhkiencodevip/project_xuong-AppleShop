import Joi from "joi";
export const CategorySchema = Joi.object({
  name: Joi.string().required().message({
    "String.base": "Title must be a string",
    "String.empty": "Title cannot be empty",
  }),
  slug: Joi.string().required().message({
    "String.base": "Title must be a string",
    "String.empty": "Title cannot be empty",
  }),
});
