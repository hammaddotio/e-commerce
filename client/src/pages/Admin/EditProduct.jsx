import { useEffect, useState } from "react"
import AdminDashboard from "./AdminDashboard"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from "../../context/auth"
import { useApi } from "../../context/api"
import Spinner from "../../components/Spinner"
import { toast } from 'react-hot-toast';

const EditProduct = () => {
    const { id } = useParams()
    const { auth } = useAuth()
    const { URI } = useApi()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState()
    const [categories, setCategories] = useState([])

    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const [stock, setStock] = useState()
    const [image, setImage] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState()

    useEffect(() => {
        const fetchCategory = async () => {
            const { data } = await axios.get(`${URI}/api/v1/category`)
            setCategories(data.category)
        }
        fetchCategory()
    }, [])

    const fetchOneProduct = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${URI}/api/v1/product/${id}`)
            setProduct(data.product)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            toast.error(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOneProduct()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.patch(`${URI}/api/v1/update-product/${id}`,
                { title, stock, price, description, image, category },
                {
                    headers: {
                        Authorization: auth?.access_token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
            setProduct(data?.product)
            setLoading(false)
            toast.success(data?.message)
        } catch (err) {
            console.log(err)
            toast.success(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminDashboard>
            {loading ?
                (<Spinner />)
                :
                (<>
                    {/* Product details */}
                    <div className="w-[80%] m-auto flex gap-5 items-center pt-10">
                        <div>
                            <img
                                src={product.image}
                                alt={product.title}
                                className='h-80'
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-semibold">{product.title}</h1>
                            <p>{product.description}</p>
                            <div className="flex gap-3">
                                <p>stock: {product.stock}</p>
                                <b>price: ${product.price}</b>
                            </div>
                        </div>
                    </div>
                </>)}

            <>
                <div className="flex flex-col gap-4 justify-center items-center h-[90vh] w-[70%] mt-5">
                    <div className="flex flex-col gap-4 justify-center items-center bg-primary-100 p-4 rounded-lg">
                        <div>
                            <h1 className="text-3xl font-semibold">Update Product</h1>
                        </div>
                        <form onSubmit={handleSubmit} >
                            <div className="flex flex-col gap-2">

                                {/* title */}
                                <input
                                    type="text"
                                    placeholder="title"
                                    name="title"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={(e) => setTitle(e.target.value)}

                                />

                                {/* price */}
                                <input
                                    type="number"
                                    placeholder="price"
                                    name="price"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={(e) => setPrice(e.target.value)}

                                />

                                {/* stock */}
                                <input
                                    type="number"
                                    placeholder="stock"
                                    name="stock"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={(e) => setStock(e.target.value)}

                                />

                                {/* category */}
                                <select
                                    name="category"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={(e) => setCategory(e.target.value)}>
                                    <option>categories</option>
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
                                    onChange={(e) => setDescription(e.target.value)}

                                />

                                {/* image */}
                                <input
                                    type="file"
                                    name="image"
                                    className="w-80 p-2 rounded-sm bg-primary-200"
                                    onChange={(e) => setImage(e.currentTarget.files[0])}

                                />

                                <button
                                    type="submit"
                                    className="transition-all font-medium bg-primary-200 p-2 rounded-sm hover:bg-secondary-100 hover:text-primary-100 "
                                >
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </div >
                </div >
            </>

        </AdminDashboard>
    )
}
export default EditProduct
