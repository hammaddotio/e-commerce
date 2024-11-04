import { Router } from 'express'
import { authAdmin, tokenCheck } from '../middlewares/auth.middleware.js'
import {
    userRegister,
    userLogin,
    userProfile,
    forgetPassword,
    checkUser,
    checkAdmin,
    allUsers,
    deleteUser,
    singleUser,
    userUpdate,
    userProfileUpdate
} from '../controllers/auth.controller.js'

const router = Router()

// router.post('/register').route(userRegister)
router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router.route('/profile').get(tokenCheck, userProfile)
router.route('/user/:name').get(tokenCheck, authAdmin, singleUser)
router.route('/user-update/:id').patch(tokenCheck, authAdmin, userUpdate)
router.route('/profile-update').patch(tokenCheck, userProfileUpdate)
router.route('/users').get(tokenCheck, authAdmin, allUsers)
router.route('/auth-user').get(tokenCheck, checkUser)
router.route('/forget-password').post(forgetPassword)
router.route('/auth-admin').get(tokenCheck, authAdmin, checkAdmin)
router.route('/delete-user/:id').patch(tokenCheck, authAdmin, deleteUser)

export default router