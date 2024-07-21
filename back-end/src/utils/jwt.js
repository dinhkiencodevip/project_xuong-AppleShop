import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRECT } = process.env;

export const generateToken = (payload, expiresIn = "10d") => {
  return jwt.sign(payload, JWT_SECRECT, { expiresIn: expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRECT);
};
