import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const authContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, access_token: '' })

    // axios.defaults.headers.common('Authorization') = auth?.access_token

    useEffect(() => {
        // const data = localStorage.getItem('auth')
        const parseData = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : {}
        // console.log(parseData)
        if (parseData) {
            setAuth({
                ...auth,
                user: parseData.user,
                access_token: parseData.access_token
            })
        }
    }, [])
    // console.log('auth', auth)

    const URI = `http://127.0.0.1:5000`



    const authObj = { auth, setAuth, URI }
    return (
        <authContext.Provider value={authObj}>
            {children}
        </authContext.Provider>
    )
}


export const useAuth = () => useContext(authContext)