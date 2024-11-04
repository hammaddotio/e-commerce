import { Router } from "express";
import { tokenCheck } from "../middlewares/auth.middleware.js";
import { addToCart } from "../controllers/cart.controller.js";

const router = Router()

router.route('/create-cart').post(tokenCheck, addToCart)


export default router