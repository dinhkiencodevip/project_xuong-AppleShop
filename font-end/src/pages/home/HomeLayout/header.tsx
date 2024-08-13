import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../../ConText/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;
  return (
    <>
      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary" />{" "}
                <a href="#" className="text-white">
                  Phương Canh, Nam Từ Liêm , Hà Nội
                </a>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary" />
                <a href="#" className="text-white">
                  15012004nguyendinhkien@gmail.com
                </a>
              </small>
            </div>
            <div className="top-link pe-2">
              <a href="#" className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </a>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary display-6">Apple Shop</h1>
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>
            <div
              className="collapse navbar-collapse bg-white"
              id="navbarCollapse"
            >
              <div className="navbar-nav mx-auto">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>
                <a href="shop.html" className="nav-item nav-link">
                  Shop
                </a>
                <a href="shop-detail.html" className="nav-item nav-link">
                  Shop Detail
                </a>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    <a href="cart.html" className="dropdown-item">
                      Cart
                    </a>
                    <a href="chackout.html" className="dropdown-item">
                      Chackout
                    </a>
                    <a href="testimonial.html" className="dropdown-item">
                      Testimonial
                    </a>
                    <a href="404.html" className="dropdown-item">
                      404 Page
                    </a>
                  </div>
                </div>
                <a href="contact.html" className="nav-item nav-link">
                  Contact
                </a>
              </div>
              <div className="d-flex m-3 me-0">
                <button
                  className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                >
                  <i className="fas fa-search text-primary" />
                </button>
                <a href="#" className="position-relative me-4 my-auto">
                  <Link to="/cart">
                    <i className="fa fa-shopping-bag fa-2x" />
                  </Link>
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: "-5px", left: 15, height: 20, minWidth: 20 }}
                  >
                    3
                  </span>
                </a>
                <div className="nav-item dropdown">
                  <a href="#" className="my-auto">
                    <i className="fas fa-user fa-2x" />
                  </a>
                  <div className="dropdown-menu">
                    {user ? (
                      <li>
                        <Link to="" className="dropdown-item">
                          User : {user?.email}
                        </Link>
                        <Link to="/order" className="dropdown-item">
                          Order
                        </Link>
                        {user.role == "admin" && (
                          <Link to="/admin" className="dropdown-item">
                            Admin
                          </Link>
                        )}
                        <button className="dropdown-item" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    ) : (
                      <li>
                        <Link to="/register" className="dropdown-item">
                          Register
                        </Link>
                        <Link to="/login" className="dropdown-item">
                          Login
                        </Link>
                      </li>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
