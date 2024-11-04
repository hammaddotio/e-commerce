import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./auth";

const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
    const { auth } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [user, setUser] = useState();

    const URI = `http://127.0.0.1:5000`;

    const fetchUser = async () => {
        try {
            setLoading(true);
            const { data } =
                auth?.access_token &&
                (await axios.get(`${URI}/api/v1/profile`, {
                    headers: {
                        Authorization: auth?.access_token,
                    },
                }));
            setUser(data?.user);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [URI, auth?.access_token]);

    const fetchOneDetail = async (route, id, set) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${URI}${route}`);
            set(data.products.find((product) => product._id === id));
            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.get(`${URI}/api/v1/search/${search}`);
            setFilteredProducts(data?.products);
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message);
        }
    };

    const ApiObj = {
        URI,
        loading,
        fetchOneDetail,
        handleSearch,
        filteredProducts,
        search,
        error,
        user,
        fetchUser,
        setSearch,
    };
    return <ApiContext.Provider value={ApiObj}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
