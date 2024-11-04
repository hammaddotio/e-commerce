import { Link, useNavigate } from 'react-router-dom';
import Layout from './../components/layout/Layout';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios'
import { useState } from 'react';
import { useApi } from '../context/api';
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';

const CheckOut = () => {
    const navigate = useNavigate()
    const { URI, user } = useApi()
    const { auth } = useAuth()
    const [loading, setLoading] = useState(false)

    let checkoutProducts = JSON.parse(localStorage.getItem('cart-product'))

    const handlePlaceOrder = async () => {
        try {
            setLoading(true)
            const orderPayload = {
                user: auth.user._id,
                products: checkoutProducts.items.map((item) => ({
                    product: item._id,
                    qty: item.qty,
                    price: item.price,
                })),
                total_price: checkoutProducts.items.reduce((total, item) => total + item.qty * item.price, 0),
                user_address: 'abccndjncsdj',
            };
            // console.log(orderPayload)
            const { data } = await axios.post(`${URI}/api/v1/place-order`,
                orderPayload, {
                headers: {
                    Authorization: auth?.access_token
                }
            })
            toast.success(data.message)
            setLoading(false)
        } catch (err) {
            toast.error(err.response && err.response.data.message)
            setLoading(false)
        }
    }

    return (
        <Layout title={'checkout - shopping app'}>
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

                        <p className='mt-3 w-fit bg-secondary-200 p-2 rounded-lg text-primary-200'>total Check-out items count {checkoutProducts.items.filter((product) => product.is_active).length}</p>

                        {/* table content */}
                        {checkoutProducts.items.length ? (
                            <div className="my-4">
                                {checkoutProducts.items.map((product, i) => (

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
                                            <p>{product.qty}</p>
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
                            <h1 className='text-3xl font-bold text-center mt-40'>Check-out is empty</h1>
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

                            <button
                                onClick={handlePlaceOrder}
                                className='mt-4 bg-primary-200 text-center p-2 rounded-sm uppercase'>
                                Place order
                            </button>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CheckOut
