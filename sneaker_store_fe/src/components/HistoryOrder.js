import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import moment from "moment";
import {
  getAllOrderByAccount,
  getHistoryOrder,
  getOrderDetail,
} from "../service/User";
import CurrencyFormat from "../format/Format";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "70%",
    backgroundColor: "white",
    color: "black",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  table: {
    color: "black",
    fontWeight: "bold",
  },
};

export function HistoryOrder() {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [page, setPage] = useState(5);
  const [listOrder, setListOrder] = useState([]);

  const getListOrder = async () => {
    try {
      const data = await getHistoryOrder(localStorage.getItem("email"), page);
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllListOrder = async () => {
    try {
      const data = await getAllOrderByAccount(localStorage.getItem("email"));
      setListOrder(data);
    } catch (error) {
      console.log(error);
    }
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const detailOrder = async (id) => {
    try {
      const data = await getOrderDetail(id);
      setOrderDetail(data);
    } catch (error) {
      console.log(error);
    }
    openModal();
  };
  const loadMore = async () => {
    const result = document.getElementById("select-form").value;
    if (result == 0) {
      setPage((page) => page + 5);
      console.log(page);
    } else {
      setPage(result);
    }
  };
  useEffect(() => {
    getAllListOrder();
    window.scrollTo(0, 0);
    document.title = "Lịch sử đặt hàng";
  }, []);

  useEffect(() => {
    getListOrder();
  }, [page]);

  if (localStorage.getItem("username") == null) {
    return (
      <>
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text product-more">
                  <a href="./home.html">
                    <i className="fa fa-home" /> Trang chủ
                  </a>

                  <span>Lịch sử mua hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="table">
          <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-4">
                      <h2>
                        <b> Lịch sử mua hàng</b>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="order-empty">
                  <p className="h6">Đăng nhập để xem lịch sử bạn nhé!</p>
                  <img src="\img\icon-design.jpg"></img>
                </div>
                <Link to={"/login"} className="btn-order">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (order == undefined) {
    return (
      <>
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text product-more">
                  <a href="./home.html">
                    <i className="fa fa-home" /> Trang chủ
                  </a>
                  <a href="./shop.html">Cá nhân</a>
                  <span>Lịch sử mua hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="table">
          <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-4">
                      <h2>
                        <b> Lịch sử mua hàng</b>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="order-empty">
                  <p className="h6">Bạn chưa mua mặt hàng nào :((</p>
                  <img src="\img\icon-design.jpg"></img>
                </div>
                <Link to={"/home"} className="btn-order">
                  Quay lại mua hàng
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
  return (
    <>
      {order && (
        <div>
          <div className="breacrumb-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-text product-more">
                    <Link to="/home">
                      <i className="fa fa-home" /> Trang chủ
                    </Link>
                    <a>Cá nhân</a>
                    <span>Lịch sử mua hàng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main className="table">
            <div className="container-xl">
              <div className="table-responsive">
                <div className="table-wrapper">
                  <div className="table-title">
                    <div className="row">
                      <div className="col-sm-4">
                        <h2>
                          <b> Lịch sử mua hàng</b>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="table-filter">
                    <div className="row">
                      <div className="col-sm-3">
                        <div className="show-entries">
                          <span>Hiện thị</span>
                          <select
                            className="form-control"
                            id="select-form"
                            onChange={() => {
                              loadMore();
                            }}
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={0} title="Hiện thị thêm">Hiện thị thêm</option>
                          </select>
                          <span>hàng</span>
                        </div>
                      </div>
                      <div className="col-sm-9"></div>
                    </div>
                  </div>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Người nhận</th>
                        <th>Địa chỉ giao hàng</th>
                        <th>Ngày mua</th>
                        <th>Trạng Thái</th>
                        <th>Tổng tiền</th>
                        <th>Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order &&
                        order.map((c, index) => {
                          return (
                            <tr key={c.id}>
                              <td>{index + 1}</td>
                              <td>
                                <a>{c.name}</a>
                              </td>
                              <td title={c.address}>
                                {c.address.substring(0, 21)}...
                              </td>
                              <td>{`${moment(
                                c.dateOrder.substring(0, 11)
                              ).format("DD/MM/YYYY")} ${c.dateOrder.substring(
                                11
                              )}`}</td>
                              {c.statusOrder == false ? (
                                <td>
                                  <span className="status text-warning">•</span>{" "}
                                  Đang giao hàng
                                </td>
                              ) : (
                                <td>
                                  <span className="status text-success">•</span>{" "}
                                  Đã nhận hàng
                                </td>
                              )}
                              <td>
                                <CurrencyFormat value={c.totalMoney} />đ
                              </td>
                              <td>
                                <a
                                  href="#"
                                  className="view"
                                  title="Chi tiết hóa đơn"
                                  data-toggle="tooltip"
                                  onClick={() => {
                                    detailOrder(c.id);
                                  }}
                                >
                                  <i className="fa fa-info-circle" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="clearfix">
                    {listOrder.length < page ? (
                      <div className="hint-text">
                        Hiện thị <b>{listOrder.length}</b> trong số{" "}
                        <b>{listOrder.length}</b> đơn hàng
                      </div>
                    ) : (
                      <div className="hint-text">
                        Hiện thị <b>{page}</b> trong số{" "}
                        <b>{listOrder.length}</b> đơn hàng
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Modal"
            >
              <button
                onClick={closeModal}
                className="btn btn-dark sticky-top"
                style={{ marginLeft: "97%" }}
              >
                X
              </button>

              <section className="table_body">
                <div className="table-title in_modal">
                  <div className="row">
                    <div className="col-sm-4">
                      <h2>
                        <b> Chi tiết hóa đơn</b>
                      </h2>
                    </div>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Sản phẩm</th>
                      <th>Tên Sản phẩm</th>
                      <th>Hãng</th>
                      <th>Size</th>
                      <th>Giá sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail &&
                      orderDetail.map((val, index) => (
                        <tr key={index}>
                          <td> {index + 1} </td>
                          <NavLink to={`/detail-product/${val.product.id}`}>
                            <td>
                              <img
                                src={val.product.imageMain}
                                alt=""
                                style={{ width: "100px" }}
                                title="Xem chi tiết sản phẩm"
                              />
                              {val.product.name}
                            </td>
                          </NavLink>
                          <td>{val.product.nameProduct}</td>
                          <td> {val.product.brand.nameBrand} </td>
                          <td> {val.product.size.size} </td>
                          <td> {val.product.price.toLocaleString()} đ</td>
                          <td> {val.quantity} </td>
                          <td>
                            {(
                              val.product.price * val.quantity
                            ).toLocaleString()}{" "}
                            đ
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </section>
            </Modal>
          </main>
        </div>
      )}
    </>
  );
}