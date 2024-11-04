import { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import DeleteButton from '../../components/Admin/DeleteButton'
import Spinner from '../../components/Spinner'
import { toast } from 'react-hot-toast';

const Products = () => {
    const { URI, auth } = useAuth()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    // const [page, setPage] = useState(1)

    const fetchAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${URI}/api/v1/products`)
            setProducts(data.products)
            setLoading(false)
        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    // const handleScroll = () => {
    //     if (window.innerHeight >= document.body.offsetHeight) {
    //         fetchAllProducts()
    //     }
    // }

    useEffect(() => {
        fetchAllProducts()

        // window.addEventListener('scroll', handleScroll)
        // return () => {
        //     window.removeEventListener('scroll', handleScroll)
        // }
    }, [])

    const handleSearch = (e) => {
        // const searchVal = e.target.value.toUpperCase()
        // const productTitles = products.map((product) => (product.title.toUpperCase()))
        // console.log(productTitles.includes(searchVal))
    }
    return (
        <AdminDashboard>
            <>
                <div>
                    {/* options */}
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
                                to={'/dashboard/admin/create-product'}
                                className="bg-secondary-200 py-2 px-3 rounded-sm text-primary-200 hover:bg-primary-300 hover:text-secondary-200 transition-all"
                            >
                                add product
                            </Link>
                        </div>
                    </div>

                    <p className='mt-3 w-fit bg-secondary-200 p-2 rounded-lg text-primary-200'>total products count {products.filter((product) => product.is_active).length}</p>

                    {/* table headings */}
                    <div className='grid grid-cols-7 text-center mt-4 bg-primary-300 rounded-sm'>
                        <b className="">image</b>
                        <b className="">title</b>
                        <b className="">price</b>
                        <b className="">stock</b>
                        <b className="">edit</b>
                        <b className="">view</b>
                        <b className="">delete</b>
                    </div>

                    {/* table content */}
                    {products.length ? (loading ?
                        (<Spinner />) :
                        (<div className="my-4">
                            {products.map((product, i) => (
                                product.is_active && (
                                    <div
                                        key={product._id}
                                        className='grid grid-cols-7 text-center my-4 items-center bg-primary-300 hover:bg-primary-100'
                                    >
                                        {/* <b>{i}</b> */}
                                        <img
                                            src={product.image}
                                            className='h-32 w-32'
                                            alt={product.title} />
                                        <h1>{product.title}</h1>
                                        <h1>{product.price}</h1>
                                        <h1>{product.stock}</h1>
                                        <Link
                                            to={`/dashboard/admin/edit-product/${product._id}`}
                                            className="text-xl cursor-pointer"
                                        >
                                            <EditOutlined />
                                        </Link>
                                        <Link
                                            to={`/product/${product._id}`}
                                            className="text-xl cursor-pointer"
                                        >
                                            <EyeOutlined />
                                        </Link>
                                        <b
                                            className='text-xl cursor-pointer hover:text-red-100'
                                        >
                                            <DeleteButton
                                                route={'delete-product'}
                                                id={product._id}
                                                item={product.title}
                                                onDeleteSuccess={fetchAllProducts}
                                            />
                                            {/* <button onClick={(product) => handleDelete(product)}>D</button> */}
                                        </b>
                                    </div>
                                )
                            ))}
                        </div>
                        )
                    ) : (
                        <h1 className='text-3xl font-bold text-center mt-40'>Products not found</h1>
                    )}
                </div>
            </>
        </AdminDashboard>
    )
}

export default Products
