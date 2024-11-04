import { useState } from "react";
import Layout from "../components/layout/Layout";
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from "../components/Spinner";

const Register = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const { username, email, password } = form

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(import.meta.VITE_REACT_APP_API)
        let res;
        try {
            setLoading(true)
            res = await axios.post(`http://127.0.0.1:5000/api/v1/register`, { username, email, password })

            if (res && !res.data.success)
                return toast.success(res.data.message)

            if (res && res.data.success) {
                toast.success(res.data.message)
                setForm({
                    username: "",
                    email: "",
                    password: "",
                });
                setLoading(false)
                navigate('/login')
            }

        } catch (err) {
            toast.error(err.response && err.response.data.message)
            setLoading(false)
        }
    }

    return (
        <Layout title={"register"}>
            <div className="flex flex-col gap-4 justify-center items-center h-[90vh]">
                {loading ? (<Spinner />) : (
                    <div className="flex flex-col gap-4 justify-center items-center bg-primary-100 p-4 rounded-lg">
                        <div>
                            <h1 className="text-3xl font-semibold">Register</h1>
                        </div>
                        <form onSubmit={handleSubmit} >
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
                                    type="email"
                                    placeholder="email"
                                    name="email"
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
                                    Register
                                </button>
                                <span className="py-2">
                                    Already member?
                                    <Link to={'/login'} className="underline text-link-100 px-1">login</Link>
                                    here
                                </span>
                            </div>
                        </form>
                    </div >
                )}
            </div >
        </Layout >
    );
};

export default Register;
