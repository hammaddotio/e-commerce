import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminDashboard from './AdminDashboard'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const CreateProduct = () => {
    const { URI, auth } = useAuth()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: '',
        stock: '',
        price: '',
        image: null,
    })
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategory = async () => {
            const { data } = await axios.get(`${URI}/api/v1/categories`)
            setCategories(data.categories)
        }
        fetchCategory()
    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setForm({
            ...form,
            [name]: files ? files[0] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // if ([form.title, form.description, form.image, form.price, form.stock, form.category].some((field) => !field || field === '')) {
            //     return toast.loading('all properties are required')
            // }
            setLoading(true)
            const { data } = await axios.post(`${URI}/api/v1/create-product`, form, {
                headers: {
                    Authorization: auth?.access_token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success(data.message)
            setLoading(false)
            navigate('/dashboard/admin/products')
        } catch (err) {
            toast.error(err.response.data.message)
            setLoading(false)
        }
    }

    return (
        <AdminDashboard>
            <div className="flex flex-col gap-4 justify-center items-center h-[90vh] w-[70%]">
                {loading ? (<Spinner />) : (
                    <div className="flex flex-col gap-4 justify-center items-center bg-primary-100 p-4 rounded-lg">
                        <div>
                            <h1 className="text-3xl font-semibold">Create Product</h1>
                        </div>
                        <form onSubmit={handleSubmit} >
                            <div className="flex flex-col gap-2">

                                {/* title */}
                                <input
                                    type="text"
                                    placeholder="title"
                                    name="title"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={handleChange}
                                    required
                                />

                                {/* price */}
                                <input
                                    type="number"
                                    placeholder="price"
                                    name="price"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={handleChange}
                                    required
                                />

                                {/* stock */}
                                <input
                                    type="number"
                                    placeholder="stock"
                                    name="stock"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={handleChange}
                                    required
                                />

                                {/* category */}
                                <select
                                    name="category"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={handleChange}>
                                    <option value="">categories</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))
                                    }
                                </select>

                                {/* description */}
                                <textarea
                                    name="description"
                                    rows="5"
                                    placeholder='description'
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={handleChange}
                                    required
                                />

                                {/* image */}
                                <input
                                    type="file"
                                    name="image"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="submit"
                                    className="transition-all font-medium bg-primary-200 p-2 rounded-sm hover:bg-secondary-100 hover:text-primary-100 "
                                >
                                    Create Product
                                </button>
                            </div>
                        </form>
                    </div >
                )}
            </div >
        </AdminDashboard >
    )
}

export default CreateProduct
