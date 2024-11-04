import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProtectedRoute from "./utils/UserProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AdminProtectedRoute from './utils/AdminProtectedRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import EditProduct from "./pages/Admin/EditProduct";
import ProductView from "./pages/ProductView";
import UserDashboard from "./pages/User/UserDashboard";
import UserProfile from "./pages/User/UserProfile";
import UserOrders from "./pages/User/UserOrders";
import AdminOrders from "./pages/Admin/AdminOrders";
import UserDashboardEdit from './pages/Admin/UserDashboardEdit';
import AllProducts from './pages/AllProducts';
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import User from "./pages/Admin/User";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/dashboard" element={<UserProtectedRoute />}>
        <Route path="user" element={<UserDashboard />} />
        <Route path="user/profile" element={<UserProfile />} />
        <Route path="user/orders" element={<UserOrders />} />
        <Route path="cart/check-out" element={<CheckOut />} />
      </Route>

      <Route path='/dashboard' element={<AdminProtectedRoute />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/edit-product/:id" element={<EditProduct />} />
        <Route path="admin/user-edit/:name" element={<UserDashboardEdit />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="user/:name" element={<User />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
