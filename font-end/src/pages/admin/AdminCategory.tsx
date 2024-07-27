import React, { useEffect, useState } from "react";
import { Category } from "../../interface/category";
import { instace } from "../../api";
import AdminLayout from "./layouts/AdminLayout";
import Categoryy from "./Category";

const AdminCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const fetchCategory = async () => {
    const { data } = await instace.get(`/category`);
    setCategory(data.data);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const handleRemove = async (_id: string) => {
    if (confirm("Bạn chắc chắn muốn xóa không?")) {
      await instace.delete(`/category/${_id}`);
      setCategory(category.filter((item) => item._id !== _id));
    }
    alert(error.response?.data.message || "Đăng kí thất bại! Email đã tồn tại");
  };
  return (
    <div>
      <AdminLayout>
        <Categoryy categorys={category} onRemove={handleRemove}></Categoryy>
      </AdminLayout>
    </div>
  );
};

export default AdminCategory;
