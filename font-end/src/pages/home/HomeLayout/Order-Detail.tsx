import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { OrderContext, OrderContextType } from "../../../ConText/OrderContext";

const OrderDetail = () => {
  const { state, getOrderById } = useContext(OrderContext) as OrderContextType;
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId);
    }
  }, [orderId, getOrderById]);

  const order = state.currentOrder;

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Order Detail</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/orders">Orders</Link>
          </li>
          <li className="breadcrumb-item active text-white">Order Detail</li>
        </ol>
      </div>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h2>Order #{order._id}</h2>
          <p>
            <strong>User ID:</strong> {order.userId}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Total Price:</strong> {order.totalPrice} Đ
          </p>

          <h3>Products</h3>
          <ul className="list-group">
            {order.products.map((prd, index) => (
              <li key={index} className="list-group-item">
                <img
                  src={prd.product.images}
                  className="img-fluid me-3"
                  style={{ width: 50, height: 50 }}
                  alt={prd.product.title}
                />
                <span>{prd.product.title}</span> -{" "}
                <strong>{prd.quantity}</strong> x {prd.product.price} Đ
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
