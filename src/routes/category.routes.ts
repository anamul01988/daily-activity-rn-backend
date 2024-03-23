import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller";
import { authenticationMiddleware } from "../middleware";

const categoryRoutes = express.Router();

categoryRoutes.use(authenticationMiddleware);

categoryRoutes.route("/").get(getAllCategories); //token lagbe login user er
// categoryRoutes.route("/:id").get(getCategoryById);
categoryRoutes.route("/create").post(createCategory); //login user er token cara ai route kaj korbe nah cause middleware er request a headers diye token pathano hoice

categoryRoutes.route("/category/:id").delete(deleteCategory);
categoryRoutes.route("/update").put(updateCategory);

export default categoryRoutes;
