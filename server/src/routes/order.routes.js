import { Router } from "express";
import { createOrder, userAllOrders, adminAllOrders, updateOrder } from "../controllers/order.controller.js";
import { authAdmin, tokenCheck } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/place-order').post(tokenCheck, createOrder)
router.route('/user-orders').get(tokenCheck, userAllOrders)
router.route('/admin-orders').get(tokenCheck, authAdmin, adminAllOrders)
router.route('/admin-update-order').patch(tokenCheck, authAdmin, updateOrder)



export default router