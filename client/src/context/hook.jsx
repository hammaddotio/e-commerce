import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const HookContext = createContext()

export const HookProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState({ items: [], total: 0 });

    const handleAddToCart = (product) => {
        try {
            const _cart = { ...cartProducts }
            let existingProduct
            _cart.items.find((cartProducts) => cartProducts._id === 'cart-product');
            // existingProduct = localStorage.getItem('cart-product') || {}
            // existingProduct?.items?.find((cartProducts) => cartProducts._id === 'cart-product')
            // const { items } = JSON.parse(localStorage.getItem('cart-product'))
            // console.log(items.filter((item) => item._id !== existing'cart-product'))
            if (existingProduct && items) {
                existingProduct.qty = (existingProduct.qty ?? 0) + 1
            } else {
                product.qty = 1
                _cart.items.push(product)
                toast.success('add new product in cart')
            }

            _cart.total = _cart.items.reduce((acc, item) => acc + (item.price * item.qty || 1), 0)

            setCartProducts({ ..._cart })
            localStorage.setItem('cart-product', JSON.stringify(_cart))
            console.log(_cart)
            // Cookies.set('cart', JSON.stringify(_cart))


        } catch (err) {
            console.log(err);
        }
    };


    const hookObj = { handleAddToCart, cartProducts, setCartProducts }
    return (
        <HookContext.Provider value={hookObj}>
            {children}
        </HookContext.Provider>
    )
}


export const useHook = () => useContext(HookContext)

