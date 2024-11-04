import Layout from "../../components/layout/Layout"
import AdminMenu from '../../components/layout/AdminMenu';

const AdminDashboard = ({ children }) => {
    return (
        <Layout>
            <div className="flex gap-4">
                <div className="w-[20%]">
                    <AdminMenu />
                </div>
                <div className="w-[80%] m-4">
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
