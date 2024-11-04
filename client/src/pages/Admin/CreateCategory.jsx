import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import { useApi } from '../../context/api'
import Spinner from '../../components/Spinner'
import { Button, Modal } from 'antd';
import { toast } from 'react-hot-toast';

const CreateCategory = () => {
    const { auth } = useAuth()
    const { URI } = useApi()

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false);
    const [editCategory, setEditCategory] = useState()
    const [newCategory, setNewCategory] = useState('')

    const fetchCategories = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${URI}/api/v1/categories`)
            setCategories(data.categories)
            console.log(data.categories.map((category) => category.name))
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {

        fetchCategories()
    }, [URI])

    const handleUpdateCategory = async (id) => {
        try {
            setLoading(true)
            await axios.patch(`${URI}/api/v1/update-category/${id}`, { name: editCategory.name }, {
                headers: {
                    Authorization: auth?.access_token
                }
            })
            auth?.access_token && fetchCategories()
            setModal(false)
            // setEditCategory(data.category)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteCategory = async (id, name) => {
        try {
            setLoading(true)
            await axios.patch(`${URI}/api/v1/delete-category/${id}`, name, {
                headers: {
                    Authorization: auth?.access_token
                }
            })
            auth?.access_token && fetchCategories()
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddCategory = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.post(`${URI}/api/v1/create-category`, { name: newCategory }, {
                headers: {
                    Authorization: auth?.access_token
                }
            })
            setNewCategory('')
            toast.success(data?.message)
            auth?.access_token && fetchCategories()
            setLoading(false)
        } catch (err) {
            setLoading(false)
            toast.error(err?.response?.data?.message)
            console.log(err)
        }
    }

    return (
        <AdminDashboard>
            <>
                {loading ?
                    (<Spinner />)
                    :
                    (
                        <>
                            <div className="flex items-center justify-between w-1/2 bg-primary-100 p-2 rounded-sm my-2 px-2">
                                <b>names</b>
                                <b>features</b>
                            </div>

                            <form autoFocus>
                                <div className="flex items-center justify-between w-1/2 bg-primary-100 p-2 rounded-sm my-2 px-2">
                                    <input
                                        type="text"
                                        placeholder='add new category'
                                        className='bg-primary-300 p-2 rounded-sm'
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                    <button
                                        onClick={handleAddCategory}
                                        className='p-2 bg-primary-300 rounded-sm'>
                                        Add
                                    </button>
                                </div>
                            </form>

                            <div className='flex flex-col gap-1'>
                                {
                                    categories.map((category) => (
                                        category.is_active && (
                                            <div key={category._id}
                                                className='flex items-center justify-between w-1/2 bg-primary-100 p-2 rounded-sm'>
                                                <p className='text-secondary-100'>{category.name}</p>
                                                <div className='flex gap-2'>
                                                    <button
                                                        onClick={() => {
                                                            setModal(true)
                                                            setEditCategory({ name: category.name, id: category._id })
                                                        }}
                                                        className='p-2 bg-primary-300 rounded-sm'
                                                    >
                                                        edit
                                                    </button>
                                                    <button
                                                        className='p-2 bg-primary-300 rounded-sm'
                                                        onClick={() => handleDeleteCategory(category._id, category.name)}
                                                    >
                                                        delete
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    ))
                                }
                            </div>


                            <Modal
                                open={modal}
                                onOk={() => setModal(false)}
                                onCancel={() => setModal(false)}
                                footer={[
                                    <Button key="back" onClick={() => setModal(false)}>
                                        Return
                                    </Button>,
                                    <Button key="save" onClick={() => handleUpdateCategory(editCategory?.id)}>
                                        Save
                                    </Button>,
                                ]}
                            >
                                <div>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setEditCategory({
                                                ...editCategory,
                                                name: e.target.value
                                            })
                                        }}
                                        placeholder='edit category' value={editCategory?.name}
                                    />
                                    <Button onClick={() => handleUpdateCategory(editCategory?.id)}>update</Button>
                                </div>
                            </Modal>
                        </>
                    )
                }
            </>
        </AdminDashboard>
    )
}

export default CreateCategory