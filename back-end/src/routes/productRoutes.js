import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductbyId,
  RemoveProduct,
  updateProductById,
} from "../controllers/Product.js";
import { validBodyRequest } from "../middlewares/ValidBodyRequest.js";
import { productShema } from "../ValidSchema/productSchema.js";

const productRoutes = Router();
productRoutes.get("/", getAllProduct);
productRoutes.get("/:id", getProductbyId);

//admin mới đc làm
productRoutes.post("/", validBodyRequest(productShema), createProduct);
productRoutes.patch("/:id", validBodyRequest(productShema), updateProductById);
productRoutes.delete("/:id", RemoveProduct);
export default productRoutes;
