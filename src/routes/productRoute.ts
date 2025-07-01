import express from "express";
import userMiddleware, { Roles } from "../middleware/userMiddleware";
import productController from "../controllers/productController";

const router = express.Router();

router.route("/")
  .post(
    userMiddleware.isUserLogin,
    userMiddleware.accessTo(Roles.Admin),
    productController.createProduct
  )
  .get(productController.getAllProducts);

router.route("/:id")
  .get(productController.getSingleProduct)
  .delete(
    userMiddleware.isUserLogin,
    userMiddleware.accessTo(Roles.Admin),
    productController.deleteProduct
  );

export default router;
