import { useEffect } from "react";

export default function () {
  useEffect(() => {
    document.title = "FAQs";
    window.scrollTo(0,0);
  }, []);
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <a href="#">
                  <i className="fa fa-home" /> Home
                </a>
                <span>FAQs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Section Begin */}
      {/* Faq Section Begin */}
      <div className="faq-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="faq-accordin">
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className="card-heading active">
                      <a
                        className="active"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                      >
                        Thời gian nhận được hàng là bao lâu?
                      </a>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <p>- Gói đảm bảo: từ 5 - 7 ngày</p>
                        <p>- Gói chuyển phát nhanh 3 - 4 ngày</p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-heading">
                      <a data-toggle="collapse" data-target="#collapseTwo">
                        Cửa hàng ở đâu?
                      </a>
                    </div>
                    <div
                      id="collapseTwo"
                      className="collapse"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <h5>Hệ thống của hàng YT-Sneaker có ở :</h5>
                        <p>
                          - 229 Hai Bà Trưng, Q.3 - (đối diện cổng công viên Lê
                          Văn Tám)
                        </p>
                        <p>
                          - 238 - 240 - 242 Đinh Tiên Hoàng, Q.1 - (dốc cầu
                          Bông, Đa Kao)
                        </p>
                        <p>
                          - 561 Điện Biên Phủ, Q.Bình Thạnh - (Lầu M, TTTM Pearl
                          Plaza)
                        </p>
                        <p>- 481 - 481B Trường Chinh, P.14, Q. Tân Bình</p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-heading">
                      <a data-toggle="collapse" data-target="#collapseThree">
                        Sản phẩm mua online có bảo đảm chất lượng không?
                      </a>
                    </div>
                    <div
                      id="collapseThree"
                      className="collapse"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <p>
                          Sản phẩm do nhập khẩu từ thương hiệu sản xuất và phân
                          phối và có bảo hành nên khách hàng hoàn toàn có thể
                          yên tâm về chất lượng.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-heading">
                      <a data-toggle="collapse" data-target="#collapseFour">
                        Không vừa ý có thể đổi trả lại không?
                      </a>
                    </div>
                    <div
                      id="collapseFour"
                      className="collapse"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <p>
                          Trong trường hợp không hài lòng về sản phẩm, khách
                          hàng vui lòng thanh toán phí vận chuyển gửi đi và gửi
                          về cho bưu điện.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <h5>
              Mọi thắc mắc liên quan tới các chính sách về sản phẩm xin vui lòng
              liên hệ:
            </h5>
            <p className="col-12">
              {" "}
              <strong>- Hotline: </strong> +84 979.274.983{" "}
            </p>
            <p className="col-12">
              <strong>- Email: </strong> yt_sneaker37@gmail.com
            </p>
            <p className="col-12">
              <strong>- Facebook: </strong> yt_sneaker37@facebook.com
            </p>
          </div>
        </div>
      </div>
      {/* Faq Section End */}
    </>
  );
}