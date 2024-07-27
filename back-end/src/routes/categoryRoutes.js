import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  getCategoryById,
  RemoveCategory,
  updateCategoryById,
} from "../controllers/Category.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";

const CategoryRoutes = Router();
CategoryRoutes.get("/", getAllCategory);
CategoryRoutes.get("/:id", getCategoryById);

// admin moi lam duoc
CategoryRoutes.use("/", checkAuth, checkIsAdmin);
CategoryRoutes.post("/", createCategory);
CategoryRoutes.patch("/:id", updateCategoryById);
CategoryRoutes.delete("/:id", RemoveCategory);
export default CategoryRoutes;
