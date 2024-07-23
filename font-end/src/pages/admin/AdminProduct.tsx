import React from "react";
import AdminLayout from "./layouts/AdminLayout";
import { useEffect, useState } from "react";
import { instace } from "../../api";
import { Products } from "../../interface/product";
import Product from "./Product";

const AdminProduct = () => {
  const [products, setProducts] = useState<Products[]>([]);
  //   const nav = useNavigate();
  const fetchProducts = async () => {
    const { data } = await instace.get(`/products`);
    setProducts(data.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  //Product
  const handleRemove = async (_id: number | string) => {
    if (confirm("Bạn chắc chắn muốn xóa không")) {
      await instace.delete(`/products/${_id}`);
      setProducts(products.filter((item) => item._id !== _id));
    }
  };
  return (
    <AdminLayout>
      <Product products={products} onRemove={handleRemove}></Product>
    </AdminLayout>
  );
};

export default AdminProduct;
