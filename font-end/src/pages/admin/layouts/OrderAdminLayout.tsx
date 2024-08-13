import { useContext, useEffect } from "react";
import { OrderContext, OrderContextType } from "../../../ConText/OrderContext";
import { Link } from "react-router-dom";

const AdminOrderLayout = () => {
  const { state, getOrders, deleteOrder, updateOrderStatus } = useContext(
    OrderContext
  ) as OrderContextType;

  useEffect(() => {
    getOrders(); // Lấy danh sách tất cả các đơn hàng
  }, [getOrders]);

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(orderId);
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="product">
      <h1 className="mb-4">Order Management</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>
                  {order.products.map((item) => (
                    <div key={item.product._id}>
                      <span>{item.product.title} - </span>
                      <span>
                        {item.quantity} x {item.product.price} Đ
                      </span>
                    </div>
                  ))}
                </td>
                <td>{order.totalPrice} Đ</td>
                <td>
                  <select
                    className="form-control"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Hủy">Hủy</option>
                  </select>
                </td>
                <td>
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="btn btn-primary me-2"
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderLayout;
