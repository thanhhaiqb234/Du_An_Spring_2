import logo from '../asset/images/1.png';
export default function Footer(){
    return(
        <>
          <footer className="footer-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="footer-left">
                    <div className="footer-logo">
                      <a href="#">
                        <img src="img/footer-logo.png" alt="" />
                      </a>
                    </div>
                    <ul>
                      <li>Địa chỉ: 80 Nguyễn Tất Thành, quận Thanh Bình, Quận Hải Châu, TP Đà Nẵng</li>
                      <li>Số điên thoại:  +84 979.274.983</li>
                      <li>Email: yt_sneaker37@gmail.com</li>
                    </ul>
                    <div className="footer-social">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-pinterest" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 offset-lg-1">
                  <div className="footer-widget">
                    <h5>Thông tin Shop</h5>
                    <ul>
                      <li>
                        <a href="#">Về Chúng Tôi</a>
                      </li>
                      <li>
                        <a href="#">Thanh Toán</a>
                      </li>
                      <li>
                        <a href="#">Liên Hệ</a>
                      </li>
                      <li>
                        <a href="#">Dịch Vụ</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="footer-widget">
                    <h5>Tài Khoản</h5>
                    <ul>
                      <li>
                        <a href="#">Tài Khoản Của Tôi</a>
                      </li>
                      <li>
                        <a href="#">Kết Nối</a>
                      </li>
                      <li>
                        <a href="#">Giỏ Hàng</a>
                      </li>
                      <li>
                        <a href="#">Shop</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="newslatter-item">
                    <h5>Tham gia để nhận thông tin khuyến mãi</h5>
                    <p></p>
                    <form action="#" className="subscribe-form">
                      <input type="text" placeholder="Nhập email của bạn" />
                      <button type="button">Đăng kí</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="copyright-reserved">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="copyright-text">
                      {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                      
                      <i className="fa fa-heart-o" aria-hidden="true" /> {" "}
                      <a href="" target="_blank">
                       
                      </a>
                      {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    </div>
                    <div className="payment-pic">
                      <img src="img/logo-vnpay.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </>
    )
}