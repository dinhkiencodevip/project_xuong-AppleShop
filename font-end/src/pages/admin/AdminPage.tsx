import { useAuth } from "../../ConText/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
// import Product from "./Product";

const MainAdmin = () => {
  const { user } = useAuth();
  console.log(user);
  if (!user || user.role !== "admin") {
    return <h1>Bạn không có quyền vào trang admin</h1>;
  }
  return (
    <div>
      <AdminLayout></AdminLayout>
    </div>
  );
};

export default MainAdmin;
