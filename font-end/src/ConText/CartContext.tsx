import { createContext, useReducer, useCallback } from "react";
import { Products } from "../interface/product";
import { instace } from "../api";
import { useNavigate } from "react-router-dom";
// Định nghĩa loại CartContext
export type CartContextType = {
  state: {
    products: { product: Products; quantity: number }[];
    totalPrice: number;
  };
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Products, quantity: number) => void;
  getCart: () => void;
  checkout: () => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
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
  | { type: "CHECKOUT" } // Không cần payload cho CHECKOUT
  | { type: "INCREASE_QUANTITY"; payload: { productId: string } }
  | { type: "DECREASE_QUANTITY"; payload: { productId: string } };

// Định nghĩa hàm reducer
const cartReducer = (state: State, action: CartAction) => {
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
    case "INCREASE_QUANTITY": {
      const updatedProducts = state.products.map((item) =>
        item.product._id === action.payload.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const newTotalPrice = updatedProducts.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      return {
        ...state,
        products: updatedProducts,
        totalPrice: newTotalPrice,
      };
    }

    case "DECREASE_QUANTITY": {
      const updatedProducts = state.products.map((item) =>
        item.product._id === action.payload.productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const newTotalPrice = updatedProducts.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      return {
        ...state,
        products: updatedProducts,
        totalPrice: newTotalPrice,
      };
    }
    case "GET_CART":
      console.log("Reducer GET_CART payload:", action.payload.totalPrice);
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
const CartContext = createContext<CartContextType>({} as CartContextType);

// Định nghĩa component CartProvider
const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const nav = useNavigate();
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
      const { cart } = res.data;

      // Ensure payload is correct
      console.log("Fetched cart data:", cart);

      dispatch({
        type: "GET_CART",
        payload: {
          products: cart.products || [],
          totalPrice: cart.totalPrice || 0,
        },
      });
    } catch (error) {
      console.error("Lấy giỏ hàng thất bại:", error);
    }
  }, []);

  const checkout = useCallback(async () => {
    try {
      await instace.post("/cart/checkout");
      dispatch({ type: "CHECKOUT", payload: {} });
      alert("Bạn đã đặt hàng thành công! Quay lại trang chủ");
      nav("/");
    } catch (error) {
      console.error("Thanh toán thất bại:", error);
    }
  }, []);

  const removeFromCart = useCallback(
    async (productId: string) => {
      try {
        const res = await instace.delete(`/cart/remove-cart/${productId}`);
        if (res.status === 200) {
          dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
        }
      } catch (error) {
        console.error("Xóa sản phẩm thất bại:", error);
      }
    },
    [dispatch]
  );
  const increaseQuantity = useCallback(
    async (productId: string) => {
      try {
        dispatch({ type: "INCREASE_QUANTITY", payload: { productId } });
        // Optionally, send the updated quantity to the backend
        await instace.patch(`/cart/increase-quantity/${productId}`);
      } catch (error) {
        console.error("Tăng số lượng thất bại:", error);
      }
    },
    [dispatch]
  );

  const decreaseQuantity = useCallback(
    async (productId: string) => {
      try {
        dispatch({ type: "DECREASE_QUANTITY", payload: { productId } });
        // Optionally, send the updated quantity to the backend
        await instace.patch(`/cart/decrease-quantity/${productId}`);
      } catch (error) {
        console.error("Giảm số lượng thất bại:", error);
      }
    },
    [dispatch]
  );

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        getCart,
        checkout,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
