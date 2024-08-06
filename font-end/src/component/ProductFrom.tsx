import { useContext, useEffect, useState } from "react";
import { Products } from "../interface/product";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../validators/validatorsFrom";
import { instace } from "../api";
import { ProductContext, ProductContextType } from "../ConText/ProductContex";
import { Category } from "../interface/category";

const ProductFrom = () => {
  const { handleProduct } = useContext(ProductContext) as ProductContextType;
  const [categories, setCategories] = useState<Category[]>([]);
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Products>({
    resolver: zodResolver(productSchema),
  });
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data } = await instace.get(`/products/${id}`);
        reset(data.data);
      }
    };
    fetchData();
  }, [id, reset]);
  useEffect(() => {
    (async () => {
      const { data } = await instace.get(`/category`);
      setCategories(data.data);
    })();
  }, []);
  return (
    <div className="edit-addProduct">
      <form
        onSubmit={handleSubmit((data) => handleProduct({ ...data, _id: id }))}
      >
        <h1>{id ? "Edit product" : "Add Product"}</h1>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-control"
            {...register("categoryId")}
          >
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            {...register("images", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            rows={4}
            {...register("description")}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {id ? "Edit product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFrom;
