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
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const productRoutes = Router();
productRoutes.get("/", getAllProduct);
productRoutes.get("/:id", getProductbyId);

//admin mới đc làm
productRoutes.use("/", checkAuth, checkIsAdmin);
productRoutes.post("/", validBodyRequest(productShema), createProduct);
productRoutes.patch("/:id", validBodyRequest(productShema), updateProductById);
productRoutes.delete("/:id", RemoveProduct);
export default productRoutes;
