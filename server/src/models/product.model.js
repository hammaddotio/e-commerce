import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    is_active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

export const Category = model('Category', categorySchema)
export const Product = model('Product', productSchema)

// const create = async () => {
//     await Category({ name: 'wemens' }).save()
// }
// create()