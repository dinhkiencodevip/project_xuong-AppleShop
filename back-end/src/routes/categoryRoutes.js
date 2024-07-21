import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  RemoveCategory,
  updateCategoryById,
} from "../controllers/Category.js";

const CategoryRoutes = Router();
CategoryRoutes.get("/", getAllCategory);
CategoryRoutes.post("/", createCategory);
CategoryRoutes.patch("/:id", updateCategoryById);
CategoryRoutes.delete("/:id", RemoveCategory);
export default CategoryRoutes;
