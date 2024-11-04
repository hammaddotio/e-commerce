import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    user_address: {
        type: String,
        required: true,
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            qty: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    total_price: {
        type: Number,
        required: true,
    },
    order_status: {
        type: String,
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
        default: 'Not Process'
    }
}, { timestamps: true });


export const Order = model('Order', orderSchema);
