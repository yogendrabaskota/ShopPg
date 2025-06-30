import express, { Router } from 'express'
import categoryController from '../controllers/categoryController'
import userMiddleware, { Roles } from '../middleware/userMiddleware'

const router:Router = express.Router()

router.route("/")
  .post(
    userMiddleware.isUserLogin, 
    userMiddleware.accessTo(Roles.Admin),  
    categoryController.addCategory
  )
    .get(categoryController.getAllCategories)
router.route("/:id").delete(userMiddleware.isUserLogin,userMiddleware.accessTo(Roles.Admin),categoryController.deleteCategory)
                    .patch(userMiddleware.isUserLogin,userMiddleware.accessTo(Roles.Admin),categoryController.updateCategory)
 


export default router