import { useEffect } from "react";
export default function Contact() {
  useEffect(() => {
    document.title = "Liên hệ với chúng tôi";
    window.scrollTo(0, 0);
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
                  <i className="fa fa-home" /> Trang chủ
                </a>
                <span>Liên hệ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Section Begin */}
      {/* Map Section Begin */}
      <div className="map spad">
        <div className="container">
          <div className="map-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48158.305462977965!2d-74.13283844036356!3d41.02757295168286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e440473470d7%3A0xcaf503ca2ee57958!2sSaddle%20River%2C%20NJ%2007458%2C%20USA!5e0!3m2!1sen!2sbd!4v1575917275626!5m2!1sen!2sbd"
              height={610}
              style={{ border: 0 }}
              allowFullScreen=""
            ></iframe>
            <div className="icon">
              <i className="fa fa-map-marker" />
            </div>
          </div>
        </div>
      </div>
      {/* Map Section Begin */}
      {/* Contact Section Begin */}
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="contact-title">
                <h4>Liên hệ với chúng tôi</h4>
                <p>
                  Mọi thắc mắc hoặc cần hỗ trợ hãy liên hệ hoặc trao đổi trực
                  tiếp với chúng tôi! Mỗi ý kiến góp ý của bạn sẽ giúp chúng tôi
                  phát triển và nâng cao dịch vụ tốt hơn
                </p>
              </div>
              <div className="contact-widget">
                <div className="cw-item">
                  <div className="ci-icon">
                    <i className="ti-location-pin" />
                  </div>
                  <div className="ci-text">
                    <span>Địa chỉ:</span>
                    <p>
                      80 Nguyễn Tất Thành, quận Thanh Bình, Quận Hải Châu, TP Đà
                      Nẵng
                    </p>
                  </div>
                </div>
                <div className="cw-item">
                  <div className="ci-icon">
                    <i className="ti-mobile" />
                  </div>
                  <div className="ci-text">
                    <span>Số điện thoại:</span>
                    <p>+84 979.274.983</p>
                  </div>
                </div>
                <div className="cw-item">
                  <div className="ci-icon">
                    <i className="ti-email" />
                  </div>
                  <div className="ci-text">
                    <span>Email:</span>
                    <p>yt_sneaker37@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <div className="contact-form">
                <div className="leave-comment">
                  <h4>Để lại ý kiến</h4>
                  <p>
                    Nhân viên của chúng tôi sẽ tiếp nhận ý kiến và giải đáp thắc
                    mắc của bạn.
                  </p>
                  <form action="#" className="comment-form">
                    <div className="row">
                      <div className="col-lg-6">
                        <input type="text" placeholder="Tên của bạn" />
                      </div>
                      <div className="col-lg-6">
                        <input type="text" placeholder="Email của bạn" />
                      </div>
                      <div className="col-lg-12">
                        <textarea placeholder="Ý kiến ..." defaultValue={""} />
                        <button type="button" className="site-btn">
                          Gửi
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section End */}
    </>
  );
}