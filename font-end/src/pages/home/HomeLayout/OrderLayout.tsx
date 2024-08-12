import { useContext, useEffect } from "react";
import { OrderContext, OrderContextType } from "../../../ConText/OrderContext";
import { Link } from "react-router-dom";

const OrderLayout = () => {
  const { state, getOrders, deleteOrder } = useContext(
    OrderContext
  ) as OrderContextType;
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId);
  };
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Orders</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Orders</li>
        </ol>
      </div>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">User</th>
                  <th scope="col">Products</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Action</th>
                  <th scope="col">Order Detail</th>
                </tr>
              </thead>
              <tbody>
                {state.orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.userId}</td>
                    <td>
                      {order.products?.map((item) => (
                        <div
                          key={item.product.images}
                          className="d-flex align-items-center mb-2"
                        >
                          <img
                            src={item.product.images}
                            className="img-fluid me-3 rounded-circle"
                            style={{ width: 50, height: 50 }}
                            alt={item.product.title}
                          />
                          <span>{item.product.title}</span>
                        </div>
                      ))}
                    </td>
                    <td>{order.totalPrice} Đ</td>
                    <td>{order.status}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-md bg-light border"
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <i className="fa fa-times text-danger" />
                      </button>
                    </td>
                    <td>
                      <Link to="/order-detail">Chi tiết đơn hàng</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderLayout;
