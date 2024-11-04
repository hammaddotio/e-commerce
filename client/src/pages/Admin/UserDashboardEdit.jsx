import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout'
import UserMenu from './../../components/layout/UserMenu';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useApi } from '../../context/api';
import Spinner from '../../components/Spinner';
import AdminDashboard from './AdminDashboard';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';

const UserDashboardEdit = () => {
    const { name } = useParams()
    const { URI } = useApi()
    const { auth } = useAuth()

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [role, setRole] = useState(false)

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            if (!username && !email && !role) return toast.error('value must be required')
            setLoading(true)
            const { data } = await axios.patch(`${URI}/api/v1/user-update/${user._id}`, { username, email, role }, {
                headers: {
                    Authorization: auth?.access_token
                }
            })

            if (!data.message) return toast.error('invalid details')

            toast.success(data.message)
            setUser(data.user)
            setLoading(false)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`${URI}/api/v1/user/${name}`, {
                    headers: {
                        Authorization: auth?.access_token,
                    }
                })
                setUser(data.user)
                setLoading(false)
            } catch (err) {
                console.log(err)
                toast.error(err.response.data.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [name, auth?.access_token])

    return (
        <AdminDashboard>
            {loading ?
                (<Spinner />)
                :
                (
                    user.username ? (
                        <div className='flex flex-col gap-5'>
                            <div>
                                <h1>username: {user.username}</h1>
                                <h1>email: {user.email}</h1>
                                <h1>role: {user.role ? 'admin' : 'user'}</h1>
                            </div>


                            <div className='bg-primary-100 p-4'>
                                <form onSubmit={(e) => handleUpdate(e)}>
                                    <div
                                        className='flex flex-col gap-2'
                                    >
                                        <input
                                            type="text"
                                            placeholder='username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className='bg-primary-200 p-2 text-secondary-100'
                                        />
                                        <input
                                            type="text"
                                            placeholder='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className='bg-primary-200 p-2 text-secondary-100'
                                        />
                                        <select
                                            name="role"
                                            className='bg-primary-200 p-2 text-secondary-100'
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option>role</option>
                                            <option value={true}>admin</option>
                                            <option value={false}>user</option>
                                        </select>
                                        <button
                                            className="transition-all font-medium bg-primary-200 p-2 rounded-sm hover:bg-secondary-100 hover:text-primary-100"
                                        >
                                            update user details
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                        :
                        (
                            <h1 className='text-3xl font-bold text-center mt-40'>User not found</h1>
                        )
                )}
        </AdminDashboard>
    )
}

export default UserDashboardEdit
