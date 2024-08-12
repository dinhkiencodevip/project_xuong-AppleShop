import { createContext, useCallback, useReducer } from "react";
import { CartItem } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { instace } from "../api";

export type OrderContextType = {
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
  createOrder: (
    userId: string,
    products: CartItem[],
    totalPrice: number,
    voucher?: string
  ) => void;
  getOrderById: (orderId: string) => void;
  getOrders: () => void;
  deleteOrder: (orderId: string) => void;
};

// Định nghĩa loại order và state

export type OrderItem = {
  _id: string;
  userId: string;
  products: CartItem[];
  totalPrice: number;
  voucher?: string;
  status: string;
  createdAt: string;
};

type OrderState = {
  orders: OrderItem[];
  currentOrder: OrderItem | null;
};

// Định nghĩa lọai OrderAction

type OrderAction =
  | { type: "CREATE_ORDER"; payload: OrderItem }
  | { type: "GET_ORDERS"; payload: OrderItem[] }
  | { type: "GET_ORDER_BY_ID"; payload: OrderItem }
  | { type: "DELETE_ORDER"; payload: string };

//Định nghĩa hàm reducer

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case "CREATE_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "GET_ORDER_BY_ID":
      return {
        ...state,
        currentOrder: action.payload,
      };
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.payload),
      };
    default:
      return state;
  }
};

const initialOrderState: OrderState = {
  orders: [],
  currentOrder: null,
};

// Tạo OrderContext
const OrderContext = createContext<OrderContextType>({} as OrderContextType);

// Định nghĩa component OrderProvider
const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialOrderState);
  const nav = useNavigate();

  const createOrder = useCallback(
    async (
      userId: string,
      products: CartItem[],
      totalPrice: number,
      voucher?: string
    ) => {
      try {
        const res = await instace.post("/orders", {
          userId,
          products,
          totalPrice,
          voucher,
        });
        dispatch({
          type: "CREATE_ORDER",
          payload: res.data.order,
        });
        alert("Đơn hàng đã được tạo thành công!");
        nav("/order");
      } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
      }
    },
    [nav]
  );

  const getOrderById = useCallback(async (orderId: string) => {
    try {
      const res = await instace.get(`/orders/${orderId}`);
      dispatch({
        type: "GET_ORDER_BY_ID",
        payload: res.data.order,
      });
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    }
  }, []);

  const getOrders = useCallback(async () => {
    try {
      const res = await instace.get("/orders");
      dispatch({
        type: "GET_ORDERS",
        payload: res.data.orders,
      });
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
    }
  }, []);

  const deleteOrder = useCallback(async (orderId: string) => {
    try {
      await instace.delete(`/orders/${orderId}`);
      dispatch({
        type: "DELETE_ORDER",
        payload: orderId,
      });
      alert("Đơn hàng đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng", error);
    }
  }, []);
  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        createOrder,
        getOrderById,
        getOrders,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
