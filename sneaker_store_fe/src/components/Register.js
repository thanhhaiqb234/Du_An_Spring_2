import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { registerAcc } from "../service/User";
import * as yup from "yup";
import Swal from "sweetalert2";
export default function Register() {
  const navigator = useNavigate();
  const handleSubmit = async (values) => {
    try {
      await registerAcc(values);
      Swal.fire({
        icon: "success",
        title: "Đăng kí tài khoản thành công",
        timer: 2000,
        showConfirmButton: false,
      });
      navigator("/login");
    } catch (e) {
      console.log(e.response.status);
      if ((e.response.status = 400)) {
        Swal.fire({
          icon: "error",
          title: "Email đã tồn tại!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi xảy ra vui lòng kiểm tra lại!!!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };
  useEffect(() => {
    document.title = "Đăng kí tài khoản";
  }, []);
  return (
    <>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <a href="#">
                  <i className="fa fa-home" /> Home
                </a>
                <span>Đăng kí tài khoản</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Form Section Begin */}
      {/* Register Section Begin */}
      <Formik
        initialValues={yup.object({
          username: "", //Tên đăng nhập
          password: "",
          confirmPassword: "",
        })}
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
          confirmPassword: yup
            .string()
            .required("Xác nhận lại mật khẩu")
            .oneOf([yup.ref("password"), "Mật khẩu không khớp"]),
        })}
        onSubmit={handleSubmit}
      >
        <div className="register-login-section spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="register-form">
                  <h2>ĐĂNG KÍ TÀI KHOẢN</h2>
                  <Form>
                    <div className="group-input">
                      <label htmlFor="username">
                        Email <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field type="text" id="username" name="username" />
                      <ErrorMessage
                        name="username"
                        className="text-red"
                        component="div"
                      />
                    </div>
                    <div className="group-input">
                      <label htmlFor="pass">
                        Mật khẩu <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field type="password" id="pass" name="password" />
                      <ErrorMessage
                        name="password"
                        className="text-red"
                        component="div"
                      />
                    </div>
                    <div className="group-input">
                      <label htmlFor="con-pass">
                        Xác nhận lại mật khẩu{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <Field
                        type="password"
                        id="con-pass"
                        name="confirmPassword"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        className="text-red"
                        component="div"
                      />
                    </div>
                    <button type="submit" className="site-btn register-btn">
                      Đăng Kí
                    </button>
                  </Form>
                  <div className="switch-login">
                    <Link to="/login" className="or-login">
                      Or Đăng nhập
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
}