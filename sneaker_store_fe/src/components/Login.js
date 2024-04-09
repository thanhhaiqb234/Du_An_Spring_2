import { Link, json } from "react-router-dom";
// import logoGoogle from "../asset/images/logo-google.png";
// import logoFacebook from "../asset/images/logo-face.png";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginAcc } from "../service/Login";
import * as yup from "yup";
import { Toast } from "react-bootstrap";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  function setWithExpiry(key, value, expiryMinutes) {
    const now = new Date();
    const expiry = new Date(now.getTime() + expiryMinutes * 60000); // thời gian hết hạn tính bằng phút
    const item = {
      ...value,
      expiry: expiry.getTime(),
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const handleLogin = async (values) => {
    try {
      const result = await loginAcc(values);
      // setWithExpiry("formLogin",values,1440)
      localStorage.setItem("username", JSON.stringify(result.username));
      localStorage.setItem("email", result.username);
      localStorage.setItem("role", JSON.stringify(result.role));
      localStorage.setItem("token", result.token);
      navigate("/home");
      Swal.fire({
        title: "Đăng nhập thành công !",
        text: "Chào mừng bạn đến với store!",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Tài khoản hoặc mật khẩu sai!",
        text: "Vui lòng kiểm tra và thử lại",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <a href="#">
                  <i className="fa fa-home" /> Trang chủ
                </a>
                <span>Đăng nhập</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="register-login-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="login-form">
                <h2>ĐĂNG NHẬP</h2>
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  validationSchema={yup.object({
                    username: yup
                      .string()
                      .required("Chưa nhập email đăng nhập.")
                      .email("Chưa đúng định dạng email: xxx@xxx.xxx")
                      .min(6, "Ít nhất 6 ký tự.")
                      .max(50, "Tối đa 50 ký tự."),
                    
                    password: yup
                      .string()
                      .required("Chưa nhập mật khẩu.")
                      .matches(
                        /^(?=.*[A-Z])(?=.*[0-9]).{8,20}$/,
                        "Mật khẩu phải từ 8 ký tự và ít hơn 20 ký tự, có chứa ký tự in hoa và ký tự số"
                      ),
                  })}
                  onSubmit={handleLogin}
                >
                  <Form>
                    <div className="group-input">
                      <label htmlFor="username">
                        Email <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field type="text" id="username" name="username" />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red"
                      />
                    </div>
                    <div className="group-input">
                      <label htmlFor="password">
                        Mật Khẩu <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field type="password" id="password" name="password" />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red"
                      />
                    </div>
                    <div className="group-input gi-check">
                      <div className="gi-more">
                        <label htmlFor="save-pass">
                          Nhớ mật khẩu
                          <Field
                            type="checkbox"
                            id="save-pass"
                            name="savePass"
                          />
                          <span className="checkmark" />
                        </label>
                        <Link to="#" className="forget-pass">
                          Quên mật khẩu ?
                        </Link>
                      </div>
                    </div>
                    <button type="submit" className="site-btn login-btn">
                      Đăng nhập
                    </button>
                  </Form>
                </Formik>
                <div className="switch-login">
                  <Link to="/register" className="or-login">
                    Hoặc Tạo Tài Khoản
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}