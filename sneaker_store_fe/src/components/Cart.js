import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartByIdAccount } from "../service/Cart";
import CurrencyFormat from "../format/Format";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { updateCart } from "../store/actions/cartActions";
import { totalProductOnCart } from "../service/Cart";
import { deleteProductById } from "../service/Cart";
import { addProductToCart } from "../service/Cart";
import { minusProductToCart } from "../service/Cart";
import { ToastContainer, toast } from "react-toastify";
export default function Cart() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState(
    JSON.parse(localStorage.getItem("username"))
  );
  const [carts, setCarts] = useState([]);

  const getCarts = async () => {
    const result = await getCartByIdAccount(headers);
    setCarts(result);
  };
  // xóa sản phẩm
  const handleDeleteProduct = async (idProduct, nameProduct) => {
    Swal.fire({
      title: `Bạn muốn xóa ${nameProduct} khỏi giỏ hàng ?`,
      text: "chức năng này không thể hoàn tác",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProductById(idProduct, headers);
        setFlag(!flag);
        const data = await totalProductOnCart(headers);
        dispatch(updateCart(data));
        toast.success(`Đã xóa ${nameProduct} khỏi giỏ hàng`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  const handleAddProduct = async (idProduct) => {
    try {
      await addProductToCart(idProduct, headers);
      setFlag(!flag);
    } catch {
      Swal.fire({
        title: "Số lượng sản phẩm không đủ",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleMinusProduct = async (idProduct) => {
    await minusProductToCart(idProduct, headers);
    setFlag(!flag);
  };

  function checkSoldOut() {
    let arr = [];
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].product.quantity === 0) {
        arr.push(carts[i].product);
      }
    }
    return arr;
  }

  const checkBeforeCheckout = async () => {
    await checkSoldOut();
    let listProduct = checkSoldOut();
    if (listProduct.length != 0) {
      console.log(listProduct);
      for (let i = 0; i < listProduct.length; i++) {
        let element = listProduct[i].nameProduct;
        toast.error(`Sản phẩm ${element} đã hết hàng`, {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      navigate("/check-out");
    }
  };

  //tổng tiền
  const [totalPrice, setTotalPrice] = useState(0);
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

  //useEffect
  useEffect(() => {
    document.title = "Giỏ Hàng";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCarts();
  }, [location, flag]);

  useEffect(() => {
    getTotalPrice();
  }, [carts]);
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text product-more">
                <Link to="/home">
                  <i className="fa fa-home" /> Trang chủ
                </Link>
                <Link to="/shop">Sản phẩm</Link>
                <span>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {username == undefined ? (
        <>
          <div className="container">
            <div className="cart-empty">
              <img src="\img\empty-cart.webp"></img>
            </div>
            <div className="row ">
              <div className="col-lg-4">
                <div className="cart-buttons">
                  <Link to="/shop" className="primary-btn continue-shop">
                    shopping ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : carts.length == 0 ? (
        <>
          <div className="container">
            <div className="cart-empty">
              <img src="\img\empty-cart.webp"></img>
            </div>
            <div className="row ">
              <div className="col-lg-4">
                <div className="cart-buttons">
                  <Link to="/shop" className="primary-btn continue-shop">
                    shopping ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <section className="shopping-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th className="p-name">Tên Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng giá</th>
                        <th>
                          <i className="ti-close" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts &&
                        carts.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td className="cart-pic first-row">
                                <img src={item.product.imageMain} alt="" />
                              </td>
                              <td className="cart-title first-row">
                                <h5>
                                  <Link
                                    to={`/detail-product/${item.product.id}`}
                                   style={{color:"black"}}>
                                    {" "}
                                    {item.product.nameProduct}
                                  </Link>
                                </h5>
                              </td>
                              <td className="p-price first-row">
                                <CurrencyFormat
                                  value={
                                    (item.product.price *
                                      (100 - item.product.discount.percent)) /
                                    100
                                  }
                                >
                                  
                                </CurrencyFormat>
                                đ
                              </td>
                              <td className="qua-col first-row">
                                <div className="pro-qty">
                                  <span
                                    className="dec qtybtn"
                                    onClick={() => {
                                      handleMinusProduct(item.product.id);
                                    }}
                                  >
                                    -
                                  </span>
                                  <input
                                    type="text"
                                    value={item.quantity}
                                    min={0}
                                  />
                                  <span
                                    className="inc qtybtn"
                                    onClick={() => {
                                      handleAddProduct(item.product.id);
                                    }}
                                  >
                                    +
                                  </span>
                                </div>
                              </td>
                              <td className="total-price first-row">
                                <CurrencyFormat
                                  value={
                                    ((item.product.price *
                                      (100 - item.product.discount.percent)) /
                                      100) *
                                    item.quantity
                                  }
                                >
                                  
                                </CurrencyFormat>
                                đ
                              </td>
                              <td className="close-td first-row">
                                <i
                                  className="ti-close"
                                  onClick={() => {
                                    handleDeleteProduct(
                                      item.product.id,
                                      item.product.nameProduct
                                    );
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="cart-buttons">
                      <Link to="/shop" className="primary-btn continue-shop">
                        Tiếp tục shopping
                      </Link>
                      {/* <a href="#" className="primary-btn up-cart">
                  Cập nhật
                </a> */}
                    </div>
                  </div>
                  <div className="col-lg-4 offset-lg-4">
                    <div className="proceed-checkout">
                      <ul>
                        <li className="cart-total">
                          Tổng tiền{" "}
                          <span>
                            <CurrencyFormat value={totalPrice}></CurrencyFormat>{" "}
                            đ
                          </span>
                        </li>
                      </ul>
                      <Link
                        onClick={() => {
                          checkBeforeCheckout();
                        }}
                        className="proceed-btn"
                      >
                        Thanh Toán
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}