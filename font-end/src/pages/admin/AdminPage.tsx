import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ConText/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
// import Product from "./Product";

const MainAdmin = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  console.log(user);
  if (!user || user.role !== "admin") {
    nav("/NotFound");
  }
  return (
    <div>
      <AdminLayout></AdminLayout>
    </div>
  );
};

export default MainAdmin;
