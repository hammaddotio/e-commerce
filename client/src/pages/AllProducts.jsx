import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useApi } from '../context/api'
import Spinner from '../components/Spinner'
import { NavLink } from 'react-router-dom'
import prices from '../assets/prices'

const AllProducts = () => {
    const { URI, search, filteredProducts, error } = useApi()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    let [checked, setChecked] = useState([])
    let [radio, setRadio] = useState([])


    useEffect(() => {
        const fetchCategory = async () => {
            const { data } = await axios.get(`${URI}/api/v1/categories`)
            setCategories(data.categories)
        }
        fetchCategory()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            setLoading(true)
            const { data } = await axios.get(`${URI}/api/v1/products`)
            setProducts(data.products)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!radio.length || !checked.length) fetchProducts()
    }, [URI])

    const handleChecked = (value, id) => {
        value ?
            setChecked((prev) => [...prev, id]) :
            setChecked(checked.filter((checked) => checked !== id))
    }

    const filterProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(`${URI}/api/v1/product-filter`, { checked, radio })
            setProducts(data?.products)
            setLoading(false)
        } catch (err) {
            console.log({
                msg: err.response.data.message,
                status: err.response.data.status
            })
            setLoading(false)
        }
    }
    useEffect(() => {
        if (checked.length > 0 && radio.length) filterProducts()
    }, [checked, radio])

    return (
        <Layout title={'products'}>
            <div className='flex gap-4'>
                {/* filters  */}
                <div className="w-[20%] bg-primary-300 min-h-max">
                    <h1>Filters</h1>
                    {/* filter by category */}
                    <div className='mx-2'>
                        <h3 className={'my-2 font-semibold text-lg'}>Categories</h3>
                        <div>
                            {
                                categories?.map((category) => (
                                    <div key={category._id} className='flex gap-1'>
                                        <input
                                            type="checkbox"
                                            value={category._id}
                                            id={category._id}
                                            onChange={(e) => handleChecked(e.target.checked, category._id)}
                                        />
                                        <label htmlFor={category._id}>{category.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* filter by price */}
                    <div className='mx-2'>
                        <h3 className={'my-2 font-semibold text-lg'}>Price</h3>
                        <div>
                            {
                                prices?.map((price) => (
                                    <div key={price._id} className='flex gap-1'>
                                        <input
                                            type="radio"
                                            value={price.array}
                                            id={price._id}
                                            name={'price'}
                                            onChange={(e) => setRadio(e.target.value)}
                                        />
                                        <label htmlFor={price._id}>{price.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <pre>
                        {JSON.stringify(checked, null, 4)}
                    </pre>
                    <pre>
                        {JSON.stringify(radio, null, 4)}
                    </pre>

                </div>

                {/* products  */}
                <div className="w-[80%] m-4">
                    <div className="mb-4">
                        Products
                    </div>
                    {/* all products  */}
                    <div>
                        {
                            loading ? (<Spinner />) : (

                                search ? (
                                    <div className='flex justify-center items-center container mx-auto'>
                                        <div className='grid grid-cols-4 gap-1'>
                                            {
                                                error ? (
                                                    <h1 className='text-3xl container font-bold text-center mt-40'>{error}</h1>
                                                ) : (
                                                    filteredProducts?.map((product) => (
                                                        product.is_active && (
                                                            <NavLink
                                                                className={'bg-primary-300 w-52 rounded-sm transition-all hover:scale-105'}
                                                                to={`/product/${product._id}`}
                                                                key={product._id}
                                                            >
                                                                <div className='' >
                                                                    <img
                                                                        className='rounded-t-sm'
                                                                        src={product.image}
                                                                        alt={product.title} />

                                                                    <div className='p-2'>
                                                                        <h1 className='text-lg font-semibold text-secondary-100' >{product.title}</h1>
                                                                        <p className='text-lg font-semibold text-secondary-100' >{product.description?.substring(0, 16)}...</p>
                                                                        <p className="text-gray-100 font-medium ">Price: ${product.price}</p>
                                                                    </div>
                                                                </div>
                                                            </NavLink>
                                                        )
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center container mx-auto'>
                                        <div className='grid grid-cols-4 gap-1'>
                                            {
                                                products?.map((product) => (
                                                    product.is_active && (
                                                        <NavLink
                                                            className={'bg-primary-300 w-52 rounded-sm transition-all hover:scale-105'}
                                                            to={`/product/${product._id}`}
                                                            key={product._id}
                                                        >
                                                            <div className='' >
                                                                <img
                                                                    className='rounded-t-sm'
                                                                    src={product.image}
                                                                    alt={product.title} />

                                                                <div className='p-2'>
                                                                    <h1 className='text-lg font-semibold text-secondary-100' >{product.title}</h1>
                                                                    <p className='text-secondary-100' >{product.description?.substring(0, 30)}...</p>
                                                                    <p className="text-gray-100 font-medium ">Price: ${product.price}</p>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                    )
                                                ))
                                            }
                                        </div>
                                    </div>
                                )

                            )
                        }
                    </div>

                </div>
            </div>
        </Layout >
    )
}

export default AllProducts
