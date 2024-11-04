import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            qty: {
                type: Number,
                require: true
            }
        }
    ],
    total: {
        type: Number,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })

export const Cart = model('Cart', cartSchema)