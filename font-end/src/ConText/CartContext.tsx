import { createContext, ReactNode, useReducer, useCallback } from "react";
import { Products } from "../interface/product";
import { instace } from "../api";

// Định nghĩa loại CartContext
export type CartContextType = {
  state: {
    products: { product: Products; quantity: number }[];
    totalPrice: number;
  };
  dispatch: React.Dispatch<any>;
  addToCart: (product: Products, quantity: number) => void;
  getCart: () => void;
  checkout: () => void;
  removeFromCart: (productId: string) => void;
};

const initialState: State = {
  products: [],
  totalPrice: 0,
};

// Định nghĩa loại CartItem và State
export type CartItem = {
  product: Products;
  quantity: number;
};

type State = {
  products: CartItem[];
  totalPrice: number;
};

// Định nghĩa loại CartAction
type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Products; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string } }
  | { type: "GET_CART"; payload: { products: CartItem[]; totalPrice: number } }
  | { type: "CHECKOUT" };

// Định nghĩa hàm reducer
const cartReducer = (state: State, action: CartAction): State => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: [
          ...state.products,
          {
            product: action.payload.product,
            quantity: action.payload.quantity,
          },
        ],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(
          (item) => item.product._id !== action.payload.productId
        ),
      };

    case "GET_CART":
      return {
        ...state,
        products: action.payload.products || [],
        totalPrice: action.payload.totalPrice || 0,
      };
    case "CHECKOUT": {
      return {
        ...initialState, // Đặt lại giỏ hàng về trạng thái ban đầu sau khi thanh toán
      };
    }

    default:
      return state;
  }
};

// Tạo CartContext
const CartContext = createContext({} as CartContextType);

// Định nghĩa component CartProvider
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback(async (product: Products, quantity: number) => {
    try {
      const res = await instace.post("/cart", {
        productId: product._id,
        quantity,
      });
      dispatch({
        type: "ADD_TO_CART",
        payload: { product: res.data.product, quantity },
      });
    } catch (error) {
      console.error("Thêm vào giỏ hàng thất bại:", error);
    }
  }, []);

  const getCart = useCallback(async () => {
    try {
      const res = await instace.get("/cart");
      console.log("Cart data from API:", res.data); // Kiểm tra dữ liệu nhận được
      dispatch({
        type: "GET_CART",
        payload: res.data,
      });
    } catch (error) {
      console.error("Lấy giỏ hàng thất bại:", error);
    }
  }, []);

  const checkout = useCallback(async () => {
    try {
      await instace.post("/cart/checkout");
      dispatch({ type: "CHECKOUT" });
    } catch (error) {
      console.error("Thanh toán thất bại:", error);
    }
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    try {
      const res = await instace.delete(`/cart/${productId}`);
      if (res.data.success) {
        dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
      }
    } catch (error) {
      console.error("Xóa khỏi giỏ hàng thất bại:", error);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, getCart, checkout, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
