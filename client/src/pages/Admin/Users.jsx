import { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import DeleteButton from './../../components/Admin/DeleteButton';

const Users = () => {
    const { URI, auth } = useAuth()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchAllUsers = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${URI}/api/v1/users`, {
                headers: {
                    Authorization: auth?.access_token
                }
            })
            setUsers(data.users)
            setLoading(false)
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [auth?.access_token])

    const handleSearch = (e) => {
        // const searchVal = e.target.value.toUpperCase()
        // const userTitles = users.map((user) => (user.title.toUpperCase()))
        // console.log(userTitles.includes(searchVal))
    }

    return (
        <AdminDashboard>
            <div>
                <div className='flex justify-between'>
                    <input
                        type="text"
                        placeholder='search...'
                        className='bg-primary-100 p-2 w-1/2'
                        onChange={handleSearch}
                    />
                    <div className='flex gap-4'>
                        <Link
                            to={'/dashboard/admin/create-category'}
                            className="bg-secondary-200 py-2 px-3 rounded-sm text-primary-200 hover:bg-primary-300 hover:text-secondary-200 transition-all"
                        >
                            add category
                        </Link>
                        <Link
                            to={'/dashboard/admin/create-user'}
                            className="bg-secondary-200 py-2 px-3 rounded-sm text-primary-200 hover:bg-primary-300 hover:text-secondary-200 transition-all"
                        >
                            add user
                        </Link>
                    </div>
                </div>

                <p className='mt-3 w-fit bg-secondary-200 p-2 rounded-lg text-primary-200'>total users {users.filter((user) => user.is_active).length}</p>

                {/* table headings */}
                <div className='grid grid-cols-6 text-center mt-4 bg-primary-300 rounded-sm'>
                    {/* <b className='text-start ml-4'>index</b> */}
                    <b className="">username</b>
                    <b className="">email</b>
                    <b className="">role</b>
                    <b className="">edit</b>
                    <b className="">view</b>
                    <b className="">delete</b>
                </div>

                {/* table content */}
                {loading ?
                    (<Spinner />)
                    :
                    users.length ? (
                        (
                            <div className="my-4">
                                {users.filter((user) => user.is_active).map((user) => (
                                    <div
                                        key={user._id}
                                        className='grid grid-cols-6 text-center my-4 p-2 items-center justify-center bg-primary-300 hover:bg-primary-100'
                                    >
                                        {/* <b className='text-start ml-4'>{i}</b> */}
                                        <h1 className="font-medium text-xl">{user.username}</h1>

                                        <p>{user.email}</p>

                                        {/* <p className={` text-center h-4 w-4 rounded-full ${user.role ? 'bg-link-100' : 'bg-red-100'} `}></p> */}
                                        <p>{user.role ? 'admin' : 'user'}</p>

                                        <Link
                                            to={`/dashboard/admin/user-edit/${user.username}`}
                                            className="text-xl cursor-pointer"
                                        >
                                            <EditOutlined />
                                        </Link>
                                        <Link
                                            to={`/dashboard/user/${user.username}`}
                                            className="text-xl cursor-pointer"
                                        >
                                            <EyeOutlined />
                                        </Link>

                                        <DeleteButton
                                            route={'delete-user'}
                                            id={user._id}
                                            item={user.username}
                                            onDeleteSuccess={fetchAllUsers}
                                        />
                                    </div>
                                ))}
                            </div>
                        )) : (<h1 className='text-3xl font-bold text-center mt-40'>Users not found</h1>)

                }
            </div>
        </AdminDashboard >
    )
}

export default Users
