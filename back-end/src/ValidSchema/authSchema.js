import Joi from "joi";

export const authShema = Joi.object({
  email: Joi.string().required().email().messages({
    "String.base": "Email must be a string",
    "String.empty": "Email cannot be empty",
    "String.email": "Email must be a valid email",
  }),
  password: Joi.string().required().min(0).messages({
    "String.base": "Password must be a number",
    "String.empty": "Password cannot be empty",
    "String.min": "Password minium value is 0 ",
  }),
  confirmPass: Joi.string().min(0).messages({
    "String.base": "Password must be a number",
    "String.empty": "Password cannot be empty",
    "String.min": "Password minium value is 0 ",
  }),
});
