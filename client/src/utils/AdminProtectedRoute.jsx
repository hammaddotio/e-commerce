import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Outlet } from 'react-router-dom'
import Spinner from "../components/Spinner";
import toast from 'react-hot-toast';


const AdminProtectedRoute = () => {
    const { auth } = useAuth()
    const [ok, setOk] = useState(false)

    useEffect(() => {
        const protectedRoute = async () => {
            const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/auth-admin`,
                {
                    headers: {
                        Authorization: auth?.access_token
                    }
                })
            if (data?.ok) setOk(true)

            // if (!auth.user.role) toast.error('unauthorized user')

        }
        if (auth?.access_token) protectedRoute()

    }, [auth?.access_token])

    return ok ? <Outlet /> : <Spinner path={''} />
}


export default AdminProtectedRoute