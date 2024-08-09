import { useContext, useEffect, useState } from "react";
import {
  CartContext,
  CartContextType,
  CartItem,
} from "../../../ConText/CartContext";
import { AuthContext, AuthContextType } from "../../../ConText/AuthContext";
import { QRCodeSVG } from "qrcode.react";

const CheckOutLayout = () => {
  const { state, getCart, checkout } = useContext(
    CartContext
  ) as CartContextType;

  const { user } = useContext(AuthContext) as AuthContextType;
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  //tích hơp qrcode
  const [paymentMethod, setPaymentMethod] = useState("");
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        await getCart();
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();

    // Nếu có thông tin người dùng sẵn có, set chúng vào userInfo
    if (user) {
      setUserInfo({
        fullname: user.fullname,
        address: user.address,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    }
  }, [getCart, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === "Transfer") {
      setQrCodeVisible(true); //Hiển thị mã qr
    } else {
      setQrCodeVisible(false);
    }
  };

  const handleSubmit = async () => {
    console.log("User Info:", userInfo);
    await checkout();
  };
  //Tạo URL Qr
  const qrCodeData = `STK:0399604776;NH:NGAN HANG MB BANK;SO TIEN:${state.totalPrice};NOI DUNG:${userInfo.fullname}`;

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Checkout</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Checkout</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Checkout Page Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Chi tiết thanh toán</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">
                <div className="form-item">
                  <label className="form-label my-3">
                    Họ và tên<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={userInfo.fullname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Địa chỉ <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={userInfo.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    SĐT<sup>*</sup>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-control"
                    value={userInfo.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Email<sup>*</sup>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check my-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="Account-1"
                    name="Accounts"
                    defaultValue="Accounts"
                  />
                  <label className="form-check-label" htmlFor="Account-1">
                    Create an account?
                  </label>
                </div>
                <hr />
              </div>
              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Products</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.products.map((prd: CartItem) => (
                        <tr key={prd.product._id}>
                          <th scope="row">
                            <div className="d-flex align-items-center mt-2">
                              <img
                                src={prd.product.images}
                                className="img-fluid rounded-circle"
                                style={{ width: 90, height: 90 }}
                                alt=""
                              />
                            </div>
                          </th>
                          <td className="py-5">{prd.product.title}</td>
                          <td className="py-5">{prd.product.price} Đ</td>
                          <td className="py-5">{prd.quantity}</td>
                          <td className="py-5">
                            {prd.product.price * prd.quantity} Đ
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <th scope="row"></th>
                        <td className="py-5">
                          <p className="mb-0 text-dark text-uppercase py-3">
                            TOTAL
                          </p>
                        </td>
                        <td className="py-5" />
                        <td className="py-5" />
                        <td className="py-5">
                          <div className="py-3 border-bottom border-top">
                            <p className="mb-0 text-dark">
                              {state.totalPrice} Đ
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="radio"
                        className="form-check-input bg-primary border-0"
                        id="Transfer-1"
                        name="paymentMethod"
                        defaultValue="Transfer"
                        onChange={handlePaymentChange}
                      />
                      <label className="form-check-label" htmlFor="Transfer-1">
                        Chuyển khoản
                      </label>
                    </div>
                    {qrCodeVisible && (
                      <div className="qr-code-container">
                        <p>Quét mã QR để thanh toán:</p>
                        <QRCodeSVG value={qrCodeData} size={256} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="radio"
                        className="form-check-input bg-primary border-0"
                        id="Payments-1"
                        name="paymentMethod"
                        value="COD"
                        onChange={handlePaymentChange}
                      />
                      <label className="form-check-label" htmlFor="Payments-1">
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button
                    type="button"
                    className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                    onClick={handleSubmit}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOutLayout;
