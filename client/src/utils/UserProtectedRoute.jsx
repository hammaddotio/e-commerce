import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Outlet } from 'react-router-dom'
import Spinner from "../components/Spinner";

const UserProtectedRoute = () => {
    const { auth } = useAuth()
    const [ok, setOk] = useState(false)

    useEffect(() => {
        const protectedRoute = async () => {
            const { data } = await axios.get(`http://127.0.0.1:5000/api/v1/auth-user`,
                {
                    headers: {
                        Authorization: auth?.access_token
                    }
                })
            if (data?.ok) setOk(true)
        }

        if (auth.access_token) protectedRoute()
    }, [auth?.access_token])

    return ok ? <Outlet /> : <Spinner />
}

export default UserProtectedRoute