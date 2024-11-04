import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Layout from './layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({ path = 'login' }) => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => --prev)
        }, 1000)
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return (() => clearInterval(interval))
    }, [count, location, path])

    return (
        <Layout>
            <div className='flex flex-col-reverse justify-center items-center h-[100vh] w-[100%]'>
                {/* <h1 className="text-3xl text-secondary-100"> redirecting  to you {count}s</h1> */}
                <Spin size='large' />
            </div>
        </Layout>
    )
}

export default Spinner;