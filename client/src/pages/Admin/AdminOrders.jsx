import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { useApi } from '../../context/api'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import { Link } from 'react-router-dom'
import Spinner from './../../components/Spinner';

const AdminOrders = () => {
    const { URI } = useApi()
    const { auth } = useAuth()

    let [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]);

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${URI}/api/v1/admin-orders`, {
                headers: {
                    Authorization: auth?.access_token
                }
            })
            setOrders(data.orders)
            console.log(data.orders)
            setLoading(false)
        } catch (err) {
            console.log(err.response?.data.message)
            setLoading(false)
        }
    }
    useEffect(() => {
        auth?.access_token && fetchOrders()
    }, [])

    const handleUpdateOrderStatus = async (e, orderId) => {
        try {
            setLoading(true)
            const { data } = await axios.patch(`${URI}/api/v1/admin-update-order`,
                { order_status: e.target.value, orderId }, {
                headers: {
                    Authorization: auth?.access_token
                }
            })
            data?.order_status && fetchOrders()
            setLoading(false)
        } catch (err) {
            console.log(err.response?.data.message)
            setLoading(false)
        }
    }

    return (
        <AdminDashboard title={'orders'}>
            <>
                <div>
                    {
                        loading ? ('<Spinner />') : (
                            orders.length > 0 ? (<div className="mt-4 flex flex-col gap-1">
                                {orders.some((order) => order.order_status === "Not Process" && "Processing" && "Shipped" && "Delivered")
                                    && <h1>new orders</h1>}
                                {
                                    orders.map((order) => (
                                        <div className="mt-4 flex flex-col gap-1" key={order._id}>
                                            <div key={order._id} className='flex flex-col bg-primary-300 p-3'>
                                                <div className='flex gap-5 my-2'>
                                                    <Link to={`/dashboard/user/${order.user.username}`}>
                                                        <b>customer: {order.user.username}</b>
                                                    </Link>
                                                    <select
                                                        onChange={(e) => handleUpdateOrderStatus(e, order._id)}
                                                        name="order_status"
                                                        className='bg-primary-100 p-2'>
                                                        <option value={order.order_status}> {order.order_status}</option>
                                                        {status.map((order_status) => (
                                                            <option key={order_status} value={order_status}> {order_status}</option>
                                                        ))}
                                                    </select>
                                                </div>
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
                                        </div>
                                    ))
                                }
                            </div>
                            )
                                :
                                (
                                    <h1 className='text-3xl font-bold text-center mt-40'>Orders Not Found</h1>
                                )
                        )
                    }
                </div>
            </>
        </AdminDashboard>
    )
}

export default AdminOrders
