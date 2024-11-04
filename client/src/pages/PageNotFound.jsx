import { Link, useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'


const PageNotFound = () => {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <Layout title={'404-Page-not-found'}>
            <div className='min-h-[70vh] flex flex-col justify-center items-center gap-4'>
                <h1 className="text-8xl font-extrabold">404</h1>
                <h2 className='text-4xl font-semibold'>!Oops Page Not Found</h2>
                <button
                    onClick={() => navigate(location.state || '/')}
                    className='text-lg font-medium border py-2 px-4 hover:bg-secondary-100 hover:text-primary-100 transition-all'>
                    Go Back
                </button>
            </div>
        </Layout>
    )
}

export default PageNotFound
