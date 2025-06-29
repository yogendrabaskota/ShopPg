import express, { Router } from 'express'
import categoryController from '../controllers/categoryController'

const router:Router = express.Router()

router.route("/").post(categoryController.addCategory)
                 .get(categoryController.getAllCategories)
router.route("/:id").delete(categoryController.deleteCategory)
                    .patch(categoryController.updateCategory)
 


export default router