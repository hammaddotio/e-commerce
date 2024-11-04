import { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useApi } from '../../context/api';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const User = () => {
    const { auth } = useAuth()
    const { URI } = useApi()
    const { name } = useParams()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)

    const fetchUser = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${URI}/api/v1/user/${name}`, {
                headers: {
                    Authorization: auth?.access_token
                }
            })
            setUser(data.user)
            setLoading(false)
        } catch (err) {
            console.log(err?.response?.data?.message)
        }
    }
    useEffect(() => {
        auth?.access_token && fetchUser()
    }, [])

    return (
        <AdminDashboard>
            {loading ? (<Spinner />) : (
                user ? (
                    <>
                        <h1>username: {user.username}</h1>
                        <p>email: {user.email}</p>
                        <p>address: {user.address && user.address}</p>
                    </>
                ) : (<>user not found</>)
            )
            }
        </AdminDashboard>
    )
}

export default User
