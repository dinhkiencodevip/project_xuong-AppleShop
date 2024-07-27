import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instace } from "../../../api";
import AdminLayout from "./AdminLayout";
import CategoryFrom from "../../../component/Category";
import { Category } from "../../../interface/category";

const AddEditCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const nav = useNavigate();
  const fetchCategory = async () => {
    const { data } = await instace.get(`/category`);
    setCategory(data.data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const onSubmitProduct = async (data: Category) => {
    if (data._id) {
      await instace.patch(`/category/${data._id}`, { ...data, _id: undefined });
      const newData = await instace.get("/category");
      setCategory(newData.data.data);
      if (confirm("Sửa Category thành công! Quay lại trang admin?")) {
        nav("/admin/category");
      }
    } else {
      const res = await instace.post(`/category`, data);
      setCategory([...category, res.data.data]);
      if (confirm("Thêm category thành công! Quay lại trang admin?")) {
        nav("/admin/category");
      }
    }
  };
  return (
    <div>
      <AdminLayout>
        <CategoryFrom onSubmit={onSubmitProduct}></CategoryFrom>
      </AdminLayout>
    </div>
  );
};

export default AddEditCategory;
