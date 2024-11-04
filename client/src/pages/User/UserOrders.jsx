import React, { useEffect, useState } from 'react'
import UserDashboard from './UserDashboard'
import { useApi } from '../../context/api'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'

const UserOrders = () => {
    const { URI } = useApi()
    const { auth } = useAuth()

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`${URI}/api/v1/user-orders`, {
                    headers: {
                        Authorization: auth?.access_token
                    }
                })
                setOrders(data.orders)
                setLoading(false)
            } catch (err) {
                console.log(err.response?.data.message)
            }
        }
        fetchOrders()
    }, [])
    return (
        <UserDashboard title={'orders'}>
            <>
                <div>
                    {
                        orders.length > 0 ? (
                            loading ? (<Spinner />) : (
                                <>
                                    <div className="mt-4 flex flex-col gap-4">
                                        {orders?.some((order) => ["Not Process", "Processing", "Shipped"].includes(order.order_status))
                                            && <h1>pending orders</h1>}
                                        {
                                            orders?.map((order) => (
                                                orders?.some((order) => ["Not Process", "Processing", "Shipped"].includes(order.order_status))
                                                && (
                                                    <div key={order._id} className='flex flex-col bg-primary-300 p-3'>
                                                        {/* <Link to={`/user/${order.user._id}`}>{order.user.username}</Link> */}
                                                        <div className='flex justify-between'>
                                                            <div className='flex gap-4 flex-wrap justify-start'>
                                                                {order.products.map((product) => (
                                                                    <Link
                                                                        to={`/product/${product.product._id}`}
                                                                        key={product.product._id}
                                                                        className='flex flex-col gap-2 items-center'>
                                                                        <img className='h-24' src={product.product.image} alt={product.product.title} />
                                                                        <p>{product.product.title}</p>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                            <div className='flex justify-between flex-col'>
                                                                <div>
                                                                    <p>address: {order.user_address}</p>
                                                                    <b>total price: {order.total_price}</b>
                                                                </div>

                                                                <div>
                                                                    <b>{new Date(order.createdAt).toLocaleString()}</b>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            ))
                                        }
                                    </div>

                                    <br /><br />

                                    <div className="mt-4 flex flex-col gap-4">
                                        {orders.some((order) => order.order_status === 'Delivered') && <h1>recent orders</h1>}
                                        {
                                            orders.map((order) => (
                                                order.order_status === 'Delivered' && (
                                                    <div key={order._id} className='flex flex-col bg-primary-300 p-3'>
                                                        {/* <Link to={`/user/${order.user._id}`}>{order.user.username}</Link> */}
                                                        <div className='flex justify-between'>
                                                            <div className='flex gap-4 flex-wrap justify-start'>
                                                                {order.products.map((product) => (
                                                                    <Link
                                                                        to={`/product/${product.product._id}`}
                                                                        key={product.product._id}
                                                                        className='flex flex-col gap-2 items-center'>
                                                                        <img className='h-24' src={product.product.image} alt={product.product.title} />
                                                                        <p>{product.product.title}</p>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                            <div className='flex justify-between flex-col w-28'>
                                                                <div>
                                                                    <p>address: {order.user_address}</p>
                                                                    <b>total price: {order.total_price}</b>
                                                                </div>

                                                                <div>
                                                                    <b>{new Date(order.createdAt).toLocaleString()}</b>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            ))
                                        }
                                    </div>
                                </>
                            )
                        ) : (
                            <h1 className='text-3xl font-bold text-center mt-40'>Orders Not Found</h1>
                        )
                    }
                </div>
            </>
        </UserDashboard>
    )
}

export default UserOrders
