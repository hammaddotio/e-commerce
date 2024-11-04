import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { EyeOutlined } from '@ant-design/icons';
import { useHook } from '../context/hook';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useApi } from '../context/api';


const Cart = () => {
    const { setCartProducts, handleAddToCart } = useHook()
    const { auth } = useAuth()
    const { user } = useApi()

    const navigate = useNavigate()

    const [qty, setQty] = useState()

    let cartProducts = JSON.parse(localStorage.getItem('cart-product'))

    const handleIncrement = (product, i) => {
        console.log('increment++')
    };


    return (
        <Layout title={'cart - shopping app'}>
            <div className='container m-auto'>
                <div className='flex gap-4'>
                    <div className="w-[70%] mt-4">
                        {/* options */}

                        {/* table headings */}
                        <div className='grid grid-cols-6 text-center bg-primary-300 rounded-sm'>
                            <b className="">image</b>
                            <b className="">title</b>
                            <b className="">qty</b>
                            <b className="">price</b>
                            <b className="">view</b>
                            <b className="">delete</b>
                        </div>

                        <p className='mt-3 w-fit bg-secondary-200 p-2 rounded-lg text-primary-200'>total Cart items count {cartProducts.items.filter((product) => product.is_active).length}</p>

                        {/* table content */}
                        {cartProducts.items.length ? (
                            <div className="my-4">
                                {cartProducts.items.map((product, i) => (

                                    <div
                                        key={product._id}
                                        className='grid grid-cols-6 text-center my-4 items-center bg-primary-300 hover:bg-primary-100'
                                    >
                                        <img
                                            src={product.image}
                                            className='h-32 w-32'
                                            alt={product.title} />
                                        <h1>{product.title}</h1>
                                        <div className='flex gap-3 justify-center items-center'>
                                            <button
                                                className='bg-primary-100 px-2 py-2 rounded-full'
                                                onClick={() => handleIncrement(product, i)}
                                            >+</button>
                                            <p>{product.qty}</p>
                                            <button className='bg-primary-100 px-2 py-2 rounded-full'>-</button>
                                        </div>
                                        <h1>{product.price}</h1>
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="text-xl cursor-pointer"
                                        >
                                            <EyeOutlined />
                                        </Link>
                                        <b
                                            className='text-xl cursor-pointer hover:text-red-100'
                                        >
                                            D
                                            {/* <button onClick={(product) => handleDelete(product)}>D</button> */}
                                        </b>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h1 className='text-3xl font-bold text-center mt-40'>Cart is empty</h1>
                        )}
                    </div>

                    <div className="w-[30%] mt-4 bg-primary-300 p-4">
                        <h1>Order Summary</h1>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className='flex justify-between'>
                                <b>items</b>
                                <b>0</b>
                            </div>
                            <hr />
                            <div className='flex justify-between'>
                                <b>total</b>
                                <b>0</b>
                            </div>
                            <hr />

                            {auth.access_token ? (
                                user?.address ? (
                                    <button
                                        onClick={() => navigate('/dashboard/cart/check-out')}
                                        className='mt-4 bg-primary-200 text-center p-2 rounded-sm uppercase'>
                                        Proceed to checkout
                                    </button>) : (
                                    <button
                                        onClick={() => navigate('/dashboard/user/profile')}
                                        className='mt-4 bg-primary-200 text-center p-2 rounded-sm uppercase'>
                                        Address Require
                                    </button>
                                )
                            ) : (
                                <button
                                    onClick={() => navigate('/login')}
                                    className='mt-4 bg-primary-200 text-center p-2 rounded-sm uppercase'>
                                    Login Require
                                </button>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
