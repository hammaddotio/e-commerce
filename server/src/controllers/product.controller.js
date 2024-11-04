import { Category, Product } from "../models/product.model.js"
import { uploadOnCloudinary } from './../utils/cloudinary.js';
import NodeCache from 'node-cache'

const nodeCache = new NodeCache()


// products
export const createProducts = async (req, res) => {
    try {
        const { title, description, price, stock, category } = req.body
        const image = req.file.path

        if (!title) return res.status(400).json({ message: 'title is required' })
        if (!description) return res.status(400).json({ message: 'description is required' })
        if (!price) return res.status(400).json({ message: 'price is required' })
        if (!stock) return res.status(400).json({ message: 'stock is required' })
        if (!category) return res.status(400).json({ message: 'category is required' })
        if (!image) return res.status(400).json({ message: 'image is required' })


        const existProduct = await Product.findOne({ title })
        if (existProduct) return res.status(400).json({ message: 'product already exist' })

        const { url } = await uploadOnCloudinary(image)
        if (!url) return res.status(500).json({ message: 'image url creation err' })

        const product = await Product.create({ title, description, price, stock, category, image: url })

        nodeCache.del('products')

        res.status(201).json({
            message: 'product created successfully',
            success: true,
            product: {
                title: product.title,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                createdAt: product.createdAt,
                image: product.image
            }
        })
    } catch (err) {
        res.status(500).send({
            message: `products getting failed`,
            success: false,
            error: err.message
        })
    }
}

export const allProduct = async (req, res) => {
    try {
        // const page = req.query.page || 1
        // const limit = req.query.limit || 10

        const products = await Product.find()
        // .limit(limit).skip((page - 1) * limit)
        if (!products) return res.status(500).send({ message: `products getting failed` })

        if (nodeCache.has('products')) {
            return res.status(200).send({
                message: `products getting successfully`,
                success: true,
                products: JSON.parse(nodeCache.get('products'))
            })
        }

        nodeCache.set('products', JSON.stringify(products))
        return res.status(200).send({
            message: `products getting successfully`,
            success: true,
            products
        })
    } catch (err) {
        res.status(500).send({
            message: `products getting failed`,
            success: false,
            error: err.message
        })
    }
}

export const singleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({ _id: id })
        if (!product) return res.status(404).json({ message: 'product not found' })

        res.status(200).json({
            message: 'product getting successfully',
            success: true,
            product
        })


    } catch (err) {
        res.status(500).json({
            message: 'product getting failed',
            error: err.message,
            success: false
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, price, stock, category } = req.body
        const image = req.file?.path

        const checkProduct = await Product.findOne({ _id: id })
        if (!checkProduct) return res.status(500).send({ message: `product getting failed` })

        let imageUrl;
        if (image) {
            imageUrl = await uploadOnCloudinary(image)
            if (!imageUrl) return res.status(500).send({ message: `image getting failed` })
        }



        const product = await Product.findByIdAndUpdate(
            { _id: id },
            { title, description, price, stock, category, image: imageUrl?.url },
            { new: true }
        )
        nodeCache.del('products')

        res.status(200).json({
            message: 'product updating successfully',
            success: true,
            product
        })

    } catch (err) {
        res.status(500).send({
            message: `products getting failed`,
            success: false,
            error: err.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const checkProduct = await Product.findOne({ _id: id })
        if (!checkProduct) return res.status(404).send({ message: `products not found` })

        const product = await Product.findByIdAndUpdate(id, { is_active: false }, { new: true })
        nodeCache.del('products')
        res.status(200).json({
            message: 'product delete successfully',
            success: true,
            product
        })
    } catch (err) {
        res.status(500).json({
            message: 'product delete failed',
            success: false,
            error: err.message
        })
    }
}

export const productFilter = async (req, res) => {
    try {
        const { key } = req.params
        const { title, category, price } = req.body
        const products = await Product.find({
            $or: [
                // { title: { $regex: `.*${key}.*`, $option: 'i' } },
                { title: { $regex: new RegExp(key, 'i') } },
                { category: category },
                { price: price }
            ]
        })
        if (!products.length) {
            return res.status(404).json({
                message: 'No products found for the given search key',
                products: []
            })
        }

        return res.status(200).json({
            success: true,
            message: 'product filtered successfully',
            products
        })

    } catch (err) {
        res.status(500).json({
            message: 'product filtering failed',
            status: false,
            error: err.message
        })
    }
}

export const productFilterByCategoryAndPrice = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        const args = {};

        if (checked.length > 0) args.category = checked;
        if (radio?.length) args.price = { $gte: radio[0], $lte: radio[1] };

        const products = await Product.find(args);

        if (!products.length) {
            return res.status(404).json({
                message: 'Products not found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Products filtered successfully',
            success: true,
            products,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Products filter failed',
            success: false,
            error: err.message,
        });
    }
};




// category
export const allCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        if (!categories) return res.status(500).send({ message: `categories getting failed` })

        return res.status(200).send({
            message: `categories getting successfully`,
            success: true,
            categories
        })
    } catch (err) {
        res.status(500).send({
            message: `categories getting failed`,
            success: false,
            error: err.message
        })
    }
}

export const singleCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findOne({ _id: id })
        if (!category) return res.status(404).json({ message: 'category not found' })

        res.status(200).json({
            message: 'category getting successfully',
            success: true,
            category
        })

    } catch (err) {
        res.status(500).json({
            message: 'category getting failed',
            error: err.message,
            success: false
        })
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body

        const existCategory = await Category.findOne({ name: name })
        if (existCategory) return res.status(400).send({ message: `category already exist` })

        const category = await Category.create({ name })

        return res.status(200).send({
            message: `new categories created`,
            success: true,
            category
        })

    } catch (err) {
        res.status(500).send({
            message: `category creation failed`,
            success: false,
            error: err.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params

        const existCategory = await Category.findOne({ name })
        if (existCategory) return res.status(400).send({ message: `category already exist` })


        const category = await Category.findByIdAndUpdate(id, { name }, { new: true })
        if (!category) return res.status(404).send({ message: `category not found` })

        return res.status(200).json({
            success: true,
            message: 'category updated successfully',
            category
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'category update failed',
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findByIdAndUpdate(id, { is_active: false }, { new: true })
        if (!category) return res.status(404).send({ message: `category not found` })

        return res.status(200).json({
            success: true,
            message: 'category delete successfully',
            category
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'category delete failed',
            error: err.message
        })
    }
}