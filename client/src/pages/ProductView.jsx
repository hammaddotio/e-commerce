import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Layout from "../components/layout/Layout"
import Spinner from "../components/Spinner"
import { useApi } from "../context/api"
import { useHook } from "../context/hook"
import axios from 'axios'


const ProductView = () => {
    const { id } = useParams()
    const { URI } = useApi()
    const { handleAddToCart } = useHook()
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`${URI}/api/v1/product/${id}`)
                setProduct(data.product)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        fetchProduct()
    }, [id])


    return (
        <Layout>
            {loading ?
                ('<Spinner />')
                :
                (<>
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
                            <div className="flex gap-3 my-2">
                                <button
                                    className="p-2 border rounded-sm hover:bg-secondary-100 hover:text-primary-100 transition-all"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="p-2 border rounded-sm hover:bg-secondary-100 hover:text-primary-100 transition-all"
                                >
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </>)

            }
        </Layout>
    )
}

export default ProductView
