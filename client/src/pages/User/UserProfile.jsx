import React, { useEffect, useState } from 'react'
import UserDashboard from './UserDashboard'
import { useAuth } from '../../context/auth'
import { useApi } from '../../context/api'
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { toast } from 'react-hot-toast';

const UserProfile = () => {
    const { user, URI, fetchUser } = useApi()
    const { auth } = useAuth()

    const [userDetails, setUserDetails] = useState()
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }


    const userUpdateHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.patch(`${URI}/api/v1/profile-update`, userDetails, {
                headers: {
                    Authorization: auth?.access_token
                }
            })
            fetchUser()
            toast.success(data.message)
            setLoading(false)
        } catch (err) {
            toast.success(err?.response?.data?.message)
            setLoading(false)
        }
    }

    return (
        <UserDashboard title={`${user?.username}- Shopping app`}>
            {
                loading ? (<Spinner />) : (
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-semibold'>username: {user?.username}</h1>
                            <p className='text-xl'>email: {user?.email}</p>
                            <p className='text-xl'>address: {user?.address && user.address}</p>
                        </div>

                        <form>
                            <div className="flex flex-col gap-2 bg-primary-100 rounded-sm p-4 w-1/2" >
                                <input className='p-2 bg-primary-200 rounded-sm' type="text" placeholder='username' onChange={handleChange} name='username' />
                                <input className='p-2 bg-primary-200 rounded-sm' type="email" placeholder='email' onChange={handleChange} name='email' />
                                <input className='p-2 bg-primary-200 rounded-sm' type="password" placeholder='password' onChange={handleChange} name='password' />
                                <input className='p-2 bg-primary-200 rounded-sm' type="text" placeholder='address' onChange={handleChange} name='address' />
                                <button className='p-2 bg-primary-200 rounded-sm' onClick={userUpdateHandler}>update details</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </UserDashboard>
    )
}

export default UserProfile
