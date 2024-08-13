import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeMain from "./pages/home/HomeMain";
import MainAdmin from "./pages/admin/AdminPage";
import AdminProduct from "./pages/admin/AdminProduct";
import AddEditProduct from "./pages/admin/layouts/Add-EditProduct";
import AdminCategory from "./pages/admin/AdminCategory";
import AddEditCategory from "./pages/admin/layouts/AddEditCategory";
import RegisterHome from "./pages/home/RegisterHome";
import HomeDetail from "./pages/home/HomeDetail";
import LoginHome from "./pages/home/LoginHome";
import NotFound from "./pages/admin/layouts/404NotFound";
import CartHome from "./pages/home/CartHome";
import CheckoutHome from "./pages/home/CheckoutHome";
import OrderHome from "./pages/home/OrderHome";
import OrderDetailHome from "./pages/home/Order-DetailHome";
import AdminOrderPage from "./pages/admin/AdminOrderPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeMain />}></Route>
        <Route path="/product/detail/:id" element={<HomeDetail />}></Route>
        {/* Private route admin */}
        <Route path="/admin" element={<MainAdmin />} />
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/product-add" element={<AddEditProduct />} />
        <Route path="/admin/product-edit/:id" element={<AddEditProduct />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/admin/category-add" element={<AddEditCategory />} />
        <Route path="/admin/category-edit/:id" element={<AddEditCategory />} />
        <Route path="/admin/orders" element={<AdminOrderPage />} />
        {/* //admin end */}
        <Route path="/register" element={<RegisterHome />} />
        <Route path="/login" element={<LoginHome />} />
        <Route path="/cart" element={<CartHome />}></Route>
        <Route path="/checkout" element={<CheckoutHome />}></Route>
        <Route path="/order" element={<OrderHome />}></Route>
        <Route path="/orders/:oderId" element={<OrderDetailHome />}></Route>
        {/* Not Found */}
        <Route path="/NotFound" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
