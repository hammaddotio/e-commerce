import { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from "../context/auth";
import Spinner from "../components/Spinner";
import Cookies from 'js-cookie';

const Login = () => {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const { username, password } = form

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { data } = await axios.post(`http://127.0.0.1:5000/api/v1/login`, { username, password })
            if (data && !data.success)
                return toast.error(data.data && data.message)

            if (data && data.success) {
                toast.success(data.message)
                setForm({
                    username: "",
                    password: "",
                });
                // localStorage.setItem('auth', JSON.stringify(data))
                Cookies.set('auth', JSON.stringify(data),
                    { secure: true, path: '/', sameSite: 'Strict', expires: 365 })
                setAuth(data)
                // setAuth(res.data)
                // setTimeout(() => (<Spinner />), 3000)
                navigate(location.state || '/')
                setLoading(false)
            }
        } catch (err) {
            toast.error(err.response && err.response.data.message)
            setLoading(false)
        }
    }

    return (
        <Layout title={"login"}>
            <div className="flex flex-col gap-4 justify-center items-center h-[90vh]">
                {loading ? (<Spinner />) : (
                    <div className="flex flex-col gap-4 justify-center items-center bg-primary-100 p-4 rounded-lg">
                        <div>
                            <h1 className="text-3xl font-semibold">Login</h1>
                        </div>
                        <form onSubmit={handleSubmit} autoFocus={true} >
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="username"
                                    name="username"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="transition-all font-medium bg-primary-200 p-2 rounded-sm hover:bg-secondary-100 hover:text-primary-100 "
                                >
                                    Login
                                </button>
                                <div className="flex flex-col gap-2 py-2">
                                    <Link to={'/forgetPassword'} className="underline text-link-100 px-1">Reset Your Password</Link>
                                    <span>
                                        New member?
                                        <Link to={'/register'} className="underline text-link-100 px-1">Register</Link>
                                        here
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div >
                )}
            </div >
        </Layout >
    )
}

export default Login
