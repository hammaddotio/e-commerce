import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

const UserDashboard = ({ children, title, content, keywords, author }) => {
    return (
        <Layout title={title} content={content} keywords={keywords} author={author} >
            <div className="flex gap-4">
                <div className="w-[20%]">
                    <UserMenu />
                </div>
                <div className="w-[80%] m-4">
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard
