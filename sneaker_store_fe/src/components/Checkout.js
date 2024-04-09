import { Link, json, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartByIdAccount } from "../service/Cart";
import CurrencyFormat from "../format/Format";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { paymentByVNPay } from "../service/Payment";
import { getInfoUser } from "../service/User";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

export default function Checkout() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  const [flag, setFlag] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("username");

  // getListCart
  const getCarts = async () => {
    const result = await getCartByIdAccount(headers);
    setCarts(result);
  };

  //getInfo User
  const getUser = async () => {
    try {
      const data = await getInfoUser(JSON.parse(email));
      setUser(data);
    } catch {
      Swal.fire({
        title:"Đăng nhập để thêm vào giỏ hàng",
        icon :"warning",
        timer:2000,
        showConfirmButton:false
      });
    }
  };

  //check before checkout
  const checkMoney = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Giỏ hàng đang trống, quay lại để mua hàng",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Mua hàng",
    }).then(() => {
      navigate("/shop");
    });
  };

  //get total price
  const getTotalPrice = () => {
    try {
      const total = carts.reduce((total, item) => {
        return (
          item.quantity *
            ((item.product.price * (100 - item.product.discount.percent)) /
              100) +
          total
        );
      }, 0);
      setTotalPrice(total);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.title = "Thanh Toán";
    getCarts();
    getUser();
  }, []);

  useEffect(() => {
    getTotalPrice();
  }, [carts]);

  function checkSoldOut() {
    let arr = [];
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].product.quantity === 0) {
        arr.push(carts[i].product);
      }
    }
    return arr;
  }
  const onSubmit = async (values) => {
    await checkSoldOut();
    let listProduct = checkSoldOut();
    console.log(listProduct);
    if (listProduct.length != 0) {
      for (let i = 0; i < listProduct.length; i++) {
        let element = listProduct[i].nameProduct;
        toast.error(`Sản phẩm ${element} đã hết hàng`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        Swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "có sản phẩm hết hàng, vui lòng chọn lại sản phẩm",
          confirmButtonText: "Quay lại",
        }).then((res) => {
          if (res.isConfirmed) {
            setCarts([]);
            navigate("/home");
          }
        });
      }
    } else {
      const result = await paymentByVNPay(totalPrice);
      localStorage.setItem("name", values.username.trim());
      localStorage.setItem("address", values.address.trim());
      localStorage.setItem("phone", values.numberPhone.trim());
      localStorage.setItem("note", values.note.trim());
      localStorage.setItem("price", totalPrice);
      localStorage.setItem(
        "email",
        JSON.parse(localStorage.getItem("username"))
      );
      window.location.href = result;
    }
  };

  if (localStorage.getItem("username") == null) {
    return navigate("/");
  }
  return (
    <>
      <ToastContainer></ToastContainer>
      {user != null && (
        <div>
          <div className="breacrumb-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-text product-more">
                    <Link to="/home">
                      <i className="fa fa-home" /> Trang Chủ
                    </Link>
                    <Link to="/shopping-cart">Giỏ hàng</Link>
                    <span>Thanh Toán</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="checkout-section spad">
            <div className="container">
              <Formik
                initialValues={{
                  ...user,
                  note: "",
                }}
                validationSchema={yup.object({
                  username: yup
                    .string()
                    .required("Nhập tên người nhận hàng")
                    .min(5, "Ít nhất 5 kí tự")
                    .max(50, "Tối đa 50 kí tự"),
                  numberPhone: yup
                    .string()
                    .required("Vui lòng nhập số điện thoại người nhận")
                    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
                  address: yup
                    .string()
                    .required("Vui lòng nhập địa chỉ giao hàng")
                    .min(10, "Địa chỉ nên rõ ràng để nhận hàng")
                    .max(100, "Địa chỉ đâu mà dài thế"),
                })}
                onSubmit={(values) => onSubmit(values)}
              >
                <Form className="checkout-form">
                  <div className="row">
                    <div className="col-lg-6">
                      <h4>Thông tin khách hàng</h4>
                      <div className="row">
                        <div className="col-lg-12">
                          <label htmlFor="fullName">
                            Họ và tên <span>*</span>
                          </label>
                          <Field
                            type="text"
                            id="fullName"
                            name="username"
                            // value={user.username}
                            placeholder=" Phạm Công Nam"
                          />
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="col-lg-12">
                          <label htmlFor="phone">
                            Số điện thoại <span>*</span>
                          </label>
                          <Field
                            type="text"
                            id="phone"
                            name="numberPhone"
                            // value={user.numberPhone}
                            placeholder="0988123688"
                          />
                          <ErrorMessage
                            name="numberPhone"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="col-lg-12">
                          <label htmlFor="address">
                            Địa chỉ <span>*</span>
                          </label>
                          <Field
                            type="text"
                            id="address"
                            name="address"
                            className="street-first"
                            // value={user.address}
                            placeholder="280 Trần Hưng Đạo, Sơn Trà, Đà Nẵng"
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="col-lg-12">
                          <label htmlFor="note">Ghi chú</label>
                          <Field
                            as="textarea"
                            id="note"
                            name="note"
                            placeholder="Kiểm tra hàng kĩ nhé"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="place-order">
                        <h4>Đơn hàng của bạn</h4>
                        <div className="order-total">
                          <ul className="order-table">
                            <li>
                              Sản phẩm <span>Tổng tiền</span>
                            </li>
                            {carts &&
                              carts.map((item) => {
                                return (
                                  <li className="fw-normal" key={item.id}>
                                    <strong className="name-product">
                                      {item.product.nameProduct}
                                    </strong>{" "}
                                    x{" "}
                                    <strong className="quantity">
                                      {item.quantity}
                                    </strong>
                                    <span className="price">
                                      <CurrencyFormat
                                        value={
                                          ((item.product.price *
                                            (100 -
                                              item.product.discount.percent)) /
                                            100) *
                                          item.quantity
                                        }
                                      ></CurrencyFormat>
                                      đ
                                    </span>
                                  </li>
                                );
                              })}
                            <li className="total-price">
                              Tổng{" "}
                              <span>
                                <CurrencyFormat
                                  value={totalPrice}
                                ></CurrencyFormat>{" "}
                                đ
                              </span>
                            </li>
                          </ul>
                          <div className="order-btn">
                            {totalPrice == 0 ? (
                              <button
                                type="button"
                                onClick={() => checkMoney()}
                                className="site-btn place-btn"
                              >
                                Thanh Toán
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="site-btn place-btn"
                              >
                                Thanh Toán
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
}