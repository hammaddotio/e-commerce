import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div className='bg-primary-100 p-2 min-h-full'>
            <h1 className='text-center text-2xl font-semibold'>User Menu</h1>
            <ul className='mt-4 flex flex-col gap-2'>
                <NavLink
                    to={'/dashboard/user/profile'}
                    className={'bg-primary-200 p-3 font-medium rounded-sm hover:bg-secondary-200 hover:text-primary-100 transition-all '}
                >
                    <li>Profile</li>
                </NavLink>
                <NavLink
                    to={'/dashboard/user/orders'}
                    className={'bg-primary-200 p-3 font-medium rounded-sm hover:bg-secondary-200 hover:text-primary-100 transition-all'}
                >
                    <li>Orders</li>
                </NavLink>
            </ul>
        </div>
    )
}

export default UserMenu
