import React, { useContext, useEffect, useState } from "react";
import { Products } from "../../../interface/product"; // Đổi tên kiểu dữ liệu từ Products sang Product
import { instace } from "../../../api";
import { Link } from "react-router-dom";
import { CartContext, CartContextType } from "../../../ConText/CartContext";

const ProductsList = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const { addToCart } = useContext(CartContext) as CartContextType;

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const { data } = await instace.get(`/products`);
      setProducts(data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product: Products) => {
    addToCart(product, 1);
    alert("Thêm sản phẩm vào giỏ hàng thành công!");
  };

  return (
    <div>
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {products.map((prd) => (
                        <div
                          key={prd._id}
                          className="col-md-6 col-lg-4 col-xl-3"
                        >
                          <div className="rounded position-relative fruite-item">
                            <div className="fruite-img">
                              <Link to={`/product/detail/${prd._id}`}>
                                <img
                                  src={prd.images}
                                  className="img-fluid w-100 rounded-top"
                                  alt={prd.title}
                                />
                              </Link>
                            </div>
                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                              <Link
                                to={`/product/detail/${prd._id}`}
                                className="title"
                              >
                                {prd.title}
                              </Link>
                              <p>{prd.description}</p>
                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0 pr-100">
                                  {prd.price} Đ
                                </p>
                                <button
                                  onClick={() => handleAddToCart(prd)}
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                >
                                  <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
