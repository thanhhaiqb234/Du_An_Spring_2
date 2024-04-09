import { useState } from "react";
import { getInfoUser } from "../service/User";
import { useEffect } from "react";
import moment from "moment/moment";
import { Link } from "react-router-dom";
export default function InfoUser() {
  const [username, setUserName] = useState(
    JSON.parse(localStorage.getItem("username"))
  );
  const [customer, setCustomer] = useState({});
  // getCustomer
  const getCustomer = async () => {
    try {
      const response = await getInfoUser(username);
      setCustomer(response);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCustomer();
  }, [username]);

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
                        <b> Thông tin cá nhân</b>
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="order-empty">
                  <p className="h6">Đăng nhập để xem thông tin cá nhân!</p>
                  <img src="\img\9b04ab3f6e653bc7d16b7e0187c5e734.png"></img>
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
                <span>Thông tin cá nhân</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content page-container" id="user-content">
        <div className="container padding">
          <div className="row  d-flex justify-content-center">
            <div className="col-xl-12 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <h6 className="f-w-600">{customer.username}</h6>
                      <p>Khách hàng thân thiết</p>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Thông tin cá nhân
                      </h6>
                      <div className="row">
                        <div className="col-sm-6 m-b-10">
                          <h6 className="m-b-10 f-w-600">Email</h6>
                          <h6 className="text-muted f-w-400">{username}</h6>
                        </div>
                        <div className="col-sm-6 m-b-10">
                          <h6 className="m-b-10 f-w-600">Số điện thoại</h6>
                          <h6 className="text-muted f-w-400">
                            {customer.numberPhone}
                          </h6>
                        </div>
                        <div className="col-sm-6 m-b-10">
                          <h6 className="m-b-10 f-w-600">Ngày sinh</h6>
                          <h6 className="text-muted f-w-400">
                            {moment(`${customer.dateOfBirth}`).format(
                              "DD-MM-YYYY"
                            )}
                          </h6>
                        </div>
                        <div className="col-sm-6 m-b-10">
                          <h6 className="m-b-10 f-w-600">Giới tính</h6>
                          <h6 className="text-muted f-w-400">
                            {customer.gender == false ? "Nữ" : "Nam"}
                          </h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Địa chỉ
                      </h6>
                      <div className="row">
                        <div className="col-sm-12">
                          <h6 className="text-muted f-w-400">
                            {customer.address}
                          </h6>
                        </div>
                      </div>
                      <ul className="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="facebook"
                            data-abc="true"
                          >
                            <i className="fa fa-facebook" aria-hidden="true" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="twitter"
                            data-abc="true"
                          >
                            <i className="fa  fa-twitter" aria-hidden="true" />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="instagram"
                            data-abc="true"
                          >
                            <i
                              className="fa  fa-instagram"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to={"/home"} className="primary-btn continue-shop">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </>
  );
}