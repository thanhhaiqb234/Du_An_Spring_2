import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { returnFromPayment } from "../service/Payment";
import CurrencyFormat from "../format/Format";
import { totalProductOnCart } from "../service/Cart";
import { getInfoUser, getOrderDetail } from "../service/User";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCart } from "../store/actions/cartActions";
import moment from "moment/moment";

export default function ReturnPayment() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const navigate = useNavigate();
  const [responseCode, setResponseCode] = useState();
  const name = localStorage.getItem("name");
  const address = localStorage.getItem("address");
  const phone = localStorage.getItem("phone");
  const note = localStorage.getItem("note");
  const email = localStorage.getItem("email");
  const priceTotal = localStorage.getItem("price");
  const [flag, setFlag] = useState(false);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  //format ngày
  const formatDate = (time) => {
    const date = time.substring(0, 11);
    const hour = time.substring(11);
    return `${hour} ${moment(date).format("DD/MM/YYYY")}`;
  };
  //back-to-top
  const [showsScrolBtn, setShowScrolBtn] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleButtonVisibility = () => {
      window.pageYOffset > 280 ? setShowScrolBtn(true) : setShowScrolBtn(false);
    };

    window.addEventListener("scroll", handleButtonVisibility);
    return () => {
      window.addEventListener("scroll", handleButtonVisibility);
    };
  }, []);

  //getCode
  const getURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const responseCode = urlParams.get("vnp_ResponseCode");
    setResponseCode(responseCode);
  };
  //hiện thị
  const display = async () => {
    if (responseCode == "00") {
      dispatch(updateCart(0));
      try {
        const data = await returnFromPayment(
          email,
          name,
          priceTotal,
          address,
          phone,
          note
        );
        setListOrderDetail(data);
        setFlag(!flag);
        Swal.fire({
          icon: "success",
          title: "Thanh toán thành công",
          timer: 2000,
        });
      } catch (e) {
        console.log(3);
      }
      // localStorage.removeItem("name");
      // localStorage.removeItem("phone");
      // localStorage.removeItem("address");
      // localStorage.removeItem("note");
    } else {
      if (responseCode == undefined) {
        Swal.fire("Xem thông tin thanh toán tại lịch sử mua hàng");
      }
      Swal.fire({
        icon: "error",
        timer: 2000,
        title: "Xem thông tin tại lịch sử đơn hàng",
        showConfirmButton: false,
      }).then(() => {
        localStorage.removeItem("name");
        localStorage.removeItem("phone");
        localStorage.removeItem("address");
        localStorage.removeItem("note");
        navigate("/home");
      });
    }
  };

  // getOdderDetail
  const getOdderDetailByOderId = async () => {
    try {
      const data = await getOrderDetail(listOrderDetail[0].orders.id);
      setListOrderDetail(data);
    } catch (e) {
      console.log(e);
    }
  };
  // // getUser
  const getUserOrder = async () => {
    try {
      const data = await getInfoUser(listOrderDetail[0].orders.account.email);
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    display();
  }, [responseCode]);

  useEffect(() => {
    document.title = "Chi tiết đơn hàng";
    window.scrollTo(0, 0);
    getURL();
  }, []);

  useEffect(() => {
    getOdderDetailByOderId();
    getUserOrder();
  }, [flag]);

  //LOADING
  const [loading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true);
    dispatch(updateCart(0));
  }, 3500);

  return (
    <>
      {loading == false ? (
        <div id="preloder">
          <div class="loader"></div>
        </div>
      ) : (
        <>
          <div className="container-fluid" id="return">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-text">
                    <Link to="/home">
                      <i className="fa fa-home" /> Trang chủ
                    </Link>
                    <span>Chi tiết đơn hàng</span>
                  </div>
                </div>
              </div>
              {/* Title */}
              <div className="d-flex justify-content-between align-items-center py-3">
                <h2 className="h5 mb-0">
                  <a href="#" className="text-muted" /> Chi tiết hóa đơn
                </h2>
              </div>
              {/* Main content */}
              <div className="row">
                <div className="col-lg-8">
                  {/* Details */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="mb-3 d-flex justify-content-between">
                        <div>
                          {listOrderDetail[0] ? (
                            <span className="me-3">
                              Ngày mua :
                              {`${moment(
                                listOrderDetail[0].orders.dateOrder.substring(
                                  0,
                                  11
                                )
                              ).format(
                                "DD/MM/YYYY"
                              )} ${listOrderDetail[0].orders.dateOrder.substring(
                                11
                              )}`}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <table className="table table-borderless">
                        <tbody>
                          {listOrderDetail &&
                            listOrderDetail.map((c) => {
                              return (
                                <tr key={c.id}>
                                  <td>
                                    <div className="d-flex mb-2">
                                      <div className="flex-shrink-0">
                                        <img
                                          src={c.product.imageMain}
                                          alt=""
                                          width={80}
                                          className="img-fluid"
                                        />
                                      </div>
                                      <div className="flex-lg-grow-1 ms-3 text-center">
                                        <h6 className="small mb-0 ">
                                          <a href="#" className="text-reset h6">
                                            {c.product.nameProduct}
                                          </a>
                                        </h6>
                                        <ul class="list-inline">
                                          <li class="list-inline-item">
                                            Màu :{c.product.color.color}
                                          </li>
                                          <li class="list-inline-item">
                                            Size: {c.product.size.size}
                                          </li>
                                          <li class="list-inline-item">
                                            Hãng: {c.product.brand.nameBrand}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="h6">{c.quantity}</td>
                                  <td className="text-end h6">
                                    <CurrencyFormat
                                      value={
                                        ((c.product.price *
                                          (100 - c.product.discount.percent)) /
                                          100) *
                                        c.quantity
                                      }
                                    ></CurrencyFormat>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                        <tfoot>
                          <tr className="fw-bold">
                            <td colSpan={2} className="h6">
                              Tổng tiền
                            </td>
                            <td className="text-end h6">
                              <CurrencyFormat
                                value={priceTotal}
                              ></CurrencyFormat>{" "}
                              đ
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  {/* Payment */}
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6">
                          <h3 className="h6">Thông tin thanh toán</h3>
                          <hr />
                          <p>
                            <strong>VNPay </strong> <br />
                            <strong>
                              Tổng tiền:{" "}
                              <CurrencyFormat
                                value={priceTotal}
                              ></CurrencyFormat>{" "}
                              đ
                            </strong>
                            <span className="badge bg-success rounded-pill">
                              Đã thanh toán
                            </span>
                          </p>
                        </div>
                        {!listOrderDetail[0] ? (
                          <div className="col-lg-6">
                            <h3 className="h6">Người đặt hàng</h3>
                            <hr />
                          </div>
                        ) : (
                          <div className="col-lg-6">
                            <h3 className="h6">Người đặt hàng</h3>
                            <hr />
                            <address>
                              <strong>{user.username}</strong>
                              <br />
                              {user.address}
                              <br />
                              <abbr title="Phone">Số điện thoại:</abbr>{" "}
                              {user.numberPhone}
                            </address>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <h4>Thông tin nhận hàng</h4>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h6">Ghi chú thêm</h3>
                      <hr />
                      {listOrderDetail[0] ? (
                        <p>
                          {listOrderDetail[0].orders.note == ""
                            ? "Không có ghi chú"
                            : listOrderDetail[0].orders.note}
                        </p>
                      ) : (
                        <p>"Không có ghi chú"</p>
                      )}
                    </div>
                  </div>
                  <div className="card mb-4">
                    {/* Shipping information */}
                    <div className="card-body">
                      <h3 className="h6">Thông tin người nhận</h3>
                      <hr />
                      {/* <h3 className="h6">Address</h3> */}
                      {!listOrderDetail[0] ? (
                        <></>
                      ) : (
                        <address>
                          <strong>{listOrderDetail[0].orders.name}</strong>
                          <br />
                          {listOrderDetail[0].orders.address}
                          <br />
                          <abbr title="Phone">Số điện thoại:</abbr>{" "}
                          {listOrderDetail[0].orders.numberPhone}
                        </address>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-lg-4">
                  <div className="cart-buttons">
                    <Link to="/home" className="primary-btn continue-shop">
                      Quay lại Trang Chủ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showsScrolBtn && (
        <a
          className="btn back-to-top"
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        >
          <i className="fa fa-angle-double-up"></i>
        </a>
      )}
    </>
  );
}