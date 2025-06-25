import express, { Router } from 'express'
import UserController from '../controllers/userController'

const router:Router = express.Router()

router.route("/register").post(UserController.register)
router.route("/login").post(UserController.login)
router.route("/forget").post(UserController.forgetPassword)
router.route("/verify").post(UserController.verifyOtp)
router.route("/reset").post(UserController.resetPassword)


export default router