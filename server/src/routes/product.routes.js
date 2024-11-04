import { Router } from "express";
import { authAdmin, tokenCheck } from './../middlewares/auth.middleware.js';
import { upload } from './../middlewares/multer.middleware.js';
import {
    allCategories,
    allProduct,
    createCategory,
    createProducts,
    deleteCategory,
    deleteProduct,
    productFilter,
    productFilterByCategoryAndPrice,
    singleCategory,
    singleProduct,
    updateCategory,
    updateProduct
} from "../controllers/product.controller.js";


const router = Router()
// products
router.route('/create-product').post(upload.single('image'), tokenCheck, authAdmin, createProducts)
router.route('/update-product/:id').patch(upload.single('image'), tokenCheck, authAdmin, updateProduct)
router.route('/delete-product/:id').patch(tokenCheck, authAdmin, deleteProduct)
router.route('/products').get(allProduct)
router.route('/product/:id').get(singleProduct)
router.route('/search/:key').get(productFilter)
router.route('/product-filter').post(productFilterByCategoryAndPrice)


// categories
router.route('/create-category').post(tokenCheck, authAdmin, createCategory)
router.route('/update-category/:id').patch(tokenCheck, authAdmin, updateCategory)
router.route('/delete-category/:id').patch(tokenCheck, authAdmin, deleteCategory)
router.route('/categories').get(allCategories)
router.route('/category/:id').get(singleCategory)




export default router