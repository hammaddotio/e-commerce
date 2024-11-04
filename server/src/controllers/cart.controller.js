import { Cart } from "../models/cart.model.js"


export const addToCart = async (req, res) => {
    try {
        const { qty, total, products } = req.body
        const user = req.userId
        const cart = await Cart.findOne({ user })
        console.log(cart)
        if (cart) {
            const productIndex = cart.products.findIndex(product => product._id === product)
            console.log(productIndex)
            if (productIndex > -1) {
                // const itemIndex = cart.products[productIndex]
                qty++
                cart.products[productIndex].qty = qty
                await cart.save()
            }
        }

        const cartCreate = await Cart.create({
            user,
            products,
            total,

        })
        return res.status(201).json({
            message: 'product add to cart successfully',
            success: true,
            cartCreate
        })
    } catch (err) {
        res.status(500).json({
            message: 'add to cart processing failed',
            success: false,
            error: err.message
        })
    }
}


// async (req, res) => {
//     const { product, quantity, name, price } = req.body;

//     const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id

//     try {
//         let cart = await Cart.findOne({ userId });

//         if (cart) {
//             //cart exists for user
//             let itemIndex = cart.products.findIndex(p => p.product == product);

//             if (itemIndex > -1) {
//                 //product exists in the cart, update the quantity
//                 let productItem = cart.products[itemIndex];
//                 productItem.quantity = quantity;
//                 cart.products[itemIndex] = productItem;
//             } else {
//                 //product does not exists in cart, add new item
//                 cart.products.push({ product, quantity, name, price });
//             }
//             cart = await cart.save();
//             return res.status(201).send(cart);
//         } else {
//             //no cart for user, create new cart
//             const newCart = await Cart.create({
//                 userId,
//                 products: [{ product, quantity, name, price }]
//             });

//             return res.status(201).send(newCart);
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Something went wrong");
//     }
// }