import { Order } from "../models/order.model.js"
import { Product } from "../models/product.model.js"

export const createOrder = async (req, res) => {
    try {
        const { user, products, user_address, total_price } = req.body
        const data = await Order.create({
            user,
            user_address,
            products,
            total_price
        })
        res.status(200).json({
            data,
            message: 'order placed successfully',
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: 'order creation failed',
            success: false,
            error: err.message
        })
    }
}

export const AdminGetAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        if (!orders) return res.status(404).json({ message: 'orders not found' })

        if (orders.some((order) => order.length <= 0)) return res.status(404).json({ message: 'orders Empty' })


        return res.status(200).json({
            message: 'orders getting successfully',
            success: true,
            orders
        })

    } catch (err) {
        res.status(500).json({
            message: 'all orders getting failed',
            success: false,
            error: err.message
        })
    }
}

export const userAllOrders = async (req, res) => {
    try {
        const user = req.userId
        const orders = await Order.find({ user: user })
            .populate('user', '-updatedAt -password -createdAt -__v -email -role -is_active')
            .populate('products.product', '-updatedAt -createdAt -__v  -is_active')
        if (!orders || orders.length === 0) return res.status(404).json({ message: 'orders not found' })

        // const productPromises = orders.map(async (order) => {
        //     const products = await Promise.all(order.products.map(async (product) => {
        //         return await Product.findById(product.product)
        //     }))
        //     return products
        // })

        // const products = await Promise.all(productPromises);

        // if (!products || products.some(productList => productList.length === 0)) {
        //     return res.status(404).json({ message: 'order products not found' })
        // }

        // const product = products.map((product) => product.find(product => product))

        return res.status(200).json({
            message: 'orders getting successfully',
            success: true,
            orders,
        })

    } catch (err) {
        res.status(500).json({
            message: 'order getting failed',
            success: false,
            error: err.message
        })
    }
}

export const adminAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', '-updatedAt -password -createdAt -__v -email -role -is_active')
            .populate('products.product', '-updatedAt -createdAt -__v  -is_active')
        if (!orders || orders.length === 0) return res.status(404).json({ message: 'orders not found' })

        // const productPromises = orders.map(async (order) => {
        //     const products = await Promise.all(order.products.map(async (product) => {
        //         return await Product.findById(product.product)
        //     }))
        //     return products
        // })

        // const products = await Promise.all(productPromises);

        // if (!products || products.some(productList => productList.length === 0)) {
        //     return res.status(404).json({ message: 'order products not found' })
        // }

        // const product = products.map((product) => product.find(product => product))

        return res.status(200).json({
            message: 'orders getting successfully',
            success: true,
            orders,
        })

    } catch (err) {
        res.status(500).json({
            message: 'order getting failed',
            success: false,
            error: err.message
        })
    }
}

export const updateOrder = async (req, res) => {
    try {
        const { order_status, orderId } = req.body

        const order = await Order.findByIdAndUpdate(orderId, { order_status }, { new: true })
        if (!order) return res.status(404).json({ message: 'order not found' })

        return res.status(200).json({
            message: 'order getting successfully',
            success: true,
            order_status: order.order_status,
        })

    } catch (err) {
        res.status(500).json({
            message: 'order getting failed',
            success: false,
            error: err.message
        })
    }
}