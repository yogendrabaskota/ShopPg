import express, { Router } from 'express'
import categoryController from '../controllers/categoryController'
import userMiddleware from '../middleware/userMiddleware'

const router:Router = express.Router()

router.route("/").post(userMiddleware.isUserLogin, categoryController.addCategory)
                 .get(categoryController.getAllCategories)
router.route("/:id").delete(userMiddleware.isUserLogin,categoryController.deleteCategory)
                    .patch(userMiddleware.isUserLogin,categoryController.updateCategory)
 


export default router