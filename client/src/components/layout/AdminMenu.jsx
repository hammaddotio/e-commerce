import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        // <div className='bg-primary-100 p-2 min-h-full'>
        <div className='bg-primary-100 p-2 min-h-full'>
            <h1 className='text-center text-2xl font-semibold'>Admin Menu</h1>
            <ul className='mt-4 flex flex-col gap-2'>
                <NavLink
                    to={'/dashboard/admin/orders'}
                    className={'bg-primary-200 p-3 font-medium rounded-sm hover:bg-secondary-200 hover:text-primary-100 transition-all'}
                >
                    <li>Orders</li>
                </NavLink>
                <NavLink
                    to={'/dashboard/admin/products'}
                    className={'bg-primary-200 p-3 font-medium rounded-sm hover:bg-secondary-200 hover:text-primary-100 transition-all'}
                >
                    <li>Products</li>
                </NavLink>
                <NavLink
                    to={'/dashboard/admin/users'}
                    className={'bg-primary-200 p-3 font-medium rounded-sm hover:bg-secondary-200 hover:text-primary-100 transition-all'}
                >
                    <li>Users</li>
                </NavLink>
            </ul>
        </div>
    )
}

export default AdminMenu
