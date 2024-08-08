import { useContext, useEffect } from "react";
import { CartContext, CartContextType } from "../../../ConText/CartContext";
import { CartItem } from "../../../ConText/CartContext";

const CartLayout = () => {
  const {
    state,
    removeFromCart,
    checkout,
    getCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext) as CartContextType;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await getCart();
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [getCart]);

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {state.products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Không có sản phẩm nào trong giỏ hàng
                    </td>
                  </tr>
                ) : (
                  state.products.map((prd: CartItem) => (
                    <tr key={prd.product._id}>
                      <td scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={prd.product.images}
                            className="img-fluid me-5 rounded-circle"
                            style={{ width: 80, height: 80 }}
                            alt={prd.product.title}
                          />
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{prd.product.title}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">${prd.product.price}</p>
                      </td>
                      <td>
                        <div
                          className="input-group quantity mt-4"
                          style={{ width: 100 }}
                        >
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-minus rounded-circle bg-light border"
                              onClick={() => decreaseQuantity(prd.product._id)}
                            >
                              <i className="fa fa-minus" />
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-center border-0"
                            value={prd.quantity}
                            readOnly
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-plus rounded-circle bg-light border"
                              onClick={() => increaseQuantity(prd.product._id)}
                            >
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          ${prd.product.price * prd.quantity}
                        </p>
                      </td>
                      <td>
                        <button
                          className="btn btn-md rounded-circle bg-light border mt-4"
                          onClick={() =>
                            removeFromCart(String(prd.product._id))
                          }
                        >
                          <i className="fa fa-times text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <input
              type="text"
              className="border-0 border-bottom rounded me-5 py-3 mb-4"
              placeholder="Coupon Code"
            />
            <button
              className="btn border-secondary rounded-pill px-4 py-3 text-primary"
              type="button"
            >
              Apply Coupon
            </button>
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8" />
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h1 className="display-6 mb-4">
                    Cart <span className="fw-normal">Total</span>
                  </h1>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className="mb-0 ps-4 me-4">Total</h5>
                  <p className="mb-0 pe-4">${state.totalPrice}</p>{" "}
                  {/* Thêm phí vận chuyển vào tổng giá */}
                </div>
                <button
                  className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                  type="button"
                  onClick={checkout}
                >
                  Proceed Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartLayout;
