import React, { createContext, useEffect, useReducer } from "react";
import { Products } from "../interface/product";
import productReducer from "../Reducers/ProductReducer";
import { useNavigate } from "react-router-dom";
import { instace } from "../api";

export type ProductContextType = {
  state: { products: Products[] };
  dispatch: React.Dispatch<any>;
  removeProduct: (id: string | undefined) => void;
  handleProduct: (data: Products) => void;
};

export const ProductContext = createContext({} as ProductContextType);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const nav = useNavigate();
  useEffect(() => {
    (async () => {
      const { data } = await instace.get(`/products`);
      dispatch({ type: "GET_PRODUCTS", payload: data.data });
    })();
  }, []);
  const removeProduct = async (id: string | undefined) => {
    try {
      if (confirm("Bạn có muốn xóa sản phẩm này không?")) {
        await instace.delete(`/products/${id}`);
        dispatch({ type: "REMOVE_PRODUCT", payload: id });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleProduct = async (product: Products) => {
    try {
      if (product._id) {
        const { data } = await instace.patch(`/products/${product._id}`, {
          ...product,
          _id: undefined,
        });
        dispatch({ type: "UPDATE_PRODUCT", payload: data.data });
        alert(data.message);
      } else {
        console.log(product);
        const { data } = await instace.post(`/products`, product);
        dispatch({ type: "ADD_PRODUCT", payload: data.data });
        alert(data.message);
      }
      window.location.href = "/admin/product";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{ state, dispatch, removeProduct, handleProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
