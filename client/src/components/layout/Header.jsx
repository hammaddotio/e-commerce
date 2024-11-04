import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast'
import { UserOutlined, ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons'
import Products from './../../pages/Admin/Products';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useApi } from '../../context/api';


const Header = () => {
    const { auth, setAuth } = useAuth()
    const { search, handleSearch, setSearch } = useApi()
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
        clearTimeout(timeoutId);
    };

    const handleMouseLeave = () => {
        const newTimeoutId = setTimeout(() => {
            setDropdownVisible(false);
        }, 500);

        setTimeoutId(newTimeoutId);
    };

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            access_token: ''
        })
        localStorage.removeItem('auth')
        Cookies.remove('auth')
        toast.success('logout successfully')
    }

    return (
        <>
            <nav>
                <div className='flex justify-between items-center px-4 py-8 h-10 bg-primary-100 shadow-lg uppercase'>
                    <div className='flex items-center gap-6 items'>
                        <div className='flex items-center gap-2 items'>
                            <Link to={'/'}>
                                <h1 className='text-3xl'>logo</h1>
                            </Link>
                        </div>
                        <div className='flex items-center gap-2 items'>
                            <NavLink to={'/'}>Home</NavLink>
                            <NavLink to={'/products'}>Products</NavLink>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSearch} className='rounded-sm flex gap-1 p-2'>
                            <input
                                type="text"
                                placeholder='search...'
                                value={search}
                                className='bg-primary-300 p-2 rounded-sm w-72'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className='bg-primary-300 py-2 px-3 rounded-sm hover:bg-secondary-200 hover:text-primary-100 transition-colors'>Search</button>
                        </form>
                    </div>

                    <ul className='flex gap-4 items-center'>
                        {!auth.user &&
                            (<NavLink to={'/login'}>
                                <li className="text-md font-normal">Login</li>
                            </NavLink>)
                        }

                        {/* dropdown */}
                        {
                            auth?.user && (<div
                                className="relative inline-block text-left"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Trigger button */}
                                <button className="text-md font-normal uppercase focus:outline-none flex gap-1 items-center text-xl"><UserOutlined /></button>

                                {/* Dropdown content */}
                                {isDropdownVisible && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <NavLink
                                                to={`/dashboard/${auth?.user?.role ? 'admin' : 'user'}`}
                                                className="block px-4 py-2 text-sm text-primary-100 hover:bg-secondary-200" role="menuitem">
                                                <span> Dashboard </span>
                                            </NavLink>
                                            {auth.user ?
                                                (<NavLink to={'/'} onClick={handleLogout}>
                                                    <li className="block px-4 py-2 text-sm text-primary-100 hover:bg-secondary-200" role="menuitem">Logout</li>
                                                </NavLink>)
                                                :
                                                (<NavLink to={'/login'}>
                                                    <li className="block px-4 py-2 text-sm text-primary-100 hover:bg-secondary-200" role="menuitem">Login</li>
                                                </NavLink>)
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>)
                        }



                        <NavLink to={'/cart'}>
                            <li className="text-xl font-normal flex items-center gap-1">
                                <ShoppingCartOutlined /> (0)
                            </li>
                        </NavLink>


                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header
