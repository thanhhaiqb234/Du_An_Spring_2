import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, getProductSimilarByIdBrand } from "../service/Product";
import CurrencyFormat from "../format/Format";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { updateCart } from "../store/actions/cartActions";
import {
  addProductToCart,
  addProductToCartDetail,
  totalProductOnCart,
} from "../service/Cart";
import { getAllImageByProduct } from "../service/Image";
import Zoom from "../format/ZoomImage";

export default function DetailProduct() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  //zoom ảnh
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const handleZoomIn = () => {
    setIsZoomedIn(true);
  };

  const handleZoomOut = () => {
    setIsZoomedIn(false);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const [product, setProducts] = useState({});
  const [images, setImages] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [imageDisplay, setImageDisplay] = useState("");
  const [quantity, setQuantity] = useState(1);

  //tìm product by id;
  const getProduct = async () => {
    const result = await getProductById(param.data);
    setProducts(result);
    setImageDisplay("");
  };
  //tìm sản phẩm tương tự
  const getProductSimilar = async () => {
    if (product.brand != undefined) {
      const data = await getProductSimilarByIdBrand(product.brand.id);
      setSimilarProducts(data);
    }
  };
  const handleDisplayImage = (value) => {
    setImageDisplay(value);
  };

  //tìm ảnh của sản phẩm
  const getImageOfProduct = async () => {
    const result = await getAllImageByProduct(param.data);
    setImages(result);
  };
  //add-to-cart
  const handleAddToCartDetail = async (id, name) => {
    if (localStorage.getItem("username") == null) {
      Swal.fire("Đăng nhập để thêm vào giỏ hàng");
    } else {
      try {
        await addProductToCartDetail(id, quantity, headers);
        toast.success(`Đã thêm ${name} vào giỏ`, {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        try {
          const data = await totalProductOnCart(headers);
          dispatch(updateCart(data));
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        Swal.fire({
          title: "Số lượng sản phẩm không đủ",
          icon: "warning",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };

  //add-to-cart
  const handleAddToCart = async (id, name) => {
    if (!localStorage.getItem("username")) {
      Swal.fire({
        title: "Đăng nhập để thêm vào giỏ hàng",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      try {
        await addProductToCart(id, headers);
        toast.success(`Đã thêm ${name} vào giỏ`, {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const data = await totalProductOnCart(headers);
        dispatch(updateCart(data));
      } catch {
        Swal.fire({
          title: "Số lượng sản phẩm không đủ",
          icon: "warning",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
  };
  const handleSoutout = () => {
    Swal.fire({
      icon: "warning",
      title: "Hiện tại sản phẩm đã hết hàng!!",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const addProduct = () => {
    if (quantity >= product.quantity) {
      Swal.fire({
        title: "Số lượng sản phẩm không đủ",
        icon: "warning",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      setQuantity((quantity) => quantity + 1);
    }
  };

  const removeProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      console.log(quantity);
    } else {
      setQuantity(1);
    }
  };

  const handleDetailProduct = async (id) => {
    const result = await getProductById(id);
    setProducts(result);
    setImageDisplay("");
    setQuantity(1);
    navigate(`/detail-product/${id}`);
  };

  //useEffect
  useEffect(() => {
    window.scrollTo(0, 200);
    getImageOfProduct();
  }, [param.data]);

  useEffect(() => {
    document.title = "Chi tiết sản phẩm ";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    getProductSimilar();
  }, [product]);

  if (product == undefined) {
    navigate("/");
  }
  return (
    <>
      <ToastContainer></ToastContainer>
      {product != {} ? (
        <>
          <div className="breacrumb-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="breadcrumb-text product-more">
                    <Link to="/home">
                      <i className="fa fa-home" /> Trang Chủ
                    </Link>
                    <Link to="/shop">Sản Phẩm</Link>
                    <span>{product.nameProduct}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="product-shop spad page-details">
            <div className="container">
              <div className="row">
                {product.brand && (
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="product-pic-zoom">
                          {imageDisplay == "" ? (
                            <img
                              className="product-big-img"
                              src={product.imageMain}
                              alt=""
                            />
                          ) : (
                            <img
                              className="product-big-img"
                              src={imageDisplay}
                              alt=""
                            />
                          )}
                          <div className="zoom-icon">
                            <i className="fa fa-search-plus" />
                          </div>
                        </div>
                        <div className="product-thumbs">
                          <div className="product-thumbs-track ps-slider owl-carousel">
                            <div className="pt">
                              <img
                                src={product.imageMain}
                                alt=""
                                onClick={() => {
                                  handleDisplayImage(product.imageMain);
                                }}
                              />
                            </div>
                            {images &&
                              images.map((image) => {
                                return (
                                  <div key={image.id} className="pt">
                                    <img
                                      src={image.url}
                                      alt=""
                                      onClick={() => {
                                        handleDisplayImage(image.url);
                                      }}
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="product-details">
                          <div className="pd-title">
                            <span>{product.brand.nameBrand}</span>
                            <h3>{product.nameProduct}</h3>
                            <a href="#" className="heart-icon">
                              <i className="icon_heart_alt" />
                            </a>
                          </div>
                          <div className="pd-rating">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-o" />
                            <span>(5)</span>
                          </div>
                          <div className="pd-desc">
                            <p></p>
                            {product.discount.id == 1 ? (
                              <h4>
                                <CurrencyFormat value={product.price} />đ
                              </h4>
                            ) : (
                              <h4>
                                <CurrencyFormat
                                  value={
                                    (product.price *
                                      (100 - product.discount.percent)) /
                                    100
                                  }
                                />{" "}
                                đ{" "}
                                <span>
                                  <CurrencyFormat value={product.price} />đ
                                </span>
                              </h4>
                            )}
                          </div>
                          <div className="pd-color">
                            <h6>Màu sắc :</h6>
                            <div className="pd-color-choose">
                              <div className="cc-item">
                                <p>{product.color.color}</p>
                              </div>
                            </div>
                          </div>
                          <div className="pd-size-choose">
                            <h6>Size :</h6>
                            <div className="sc-item">
                              <input type="radio" id="sm-size" />
                              <label htmlFor="sm-size">
                                {product.size.size}
                              </label>
                            </div>
                          </div>
                          {product.quantity == 0 ? (
                            <div className="quantity">
                              <img
                                src="\img\hethang.png"
                                style={{ width: "50%" }}
                              />
                            </div>
                          ) : (
                            <div className="quantity">
                              <div className="pro-qty">
                                <span
                                  className="dec qtybtn"
                                  onClick={removeProduct}
                                >
                                  -
                                </span>
                                <input
                                  type="text"
                                  value={quantity}
                                  min={0}
                                  max={10}
                                />
                                <span
                                  className="inc qtybtn"
                                  onClick={() => {
                                    addProduct();
                                  }}
                                >
                                  +
                                </span>
                              </div>
                              <a
                                onClick={() => {
                                  handleAddToCartDetail(
                                    product.id,
                                    product.nameProduct
                                  );
                                }}
                                className="primary-btn pd-cart"
                              >
                                Thêm giỏ hàng
                              </a>
                            </div>
                          )}
                          <ul className="pd-tags">
                            <li>
                              <span>Thể loại</span>:{" "}
                              <Link
                                to={`/shop-brand/${product.brand.nameBrand}`}
                              >
                                {product.brand.nameBrand}
                              </Link>
                              ,{" "}
                              <Link
                                to={`/shop-type/${product.productType.productType}`}
                              >
                                Giày {product.productType.productType}
                              </Link>
                              , <Link to="">{product.material}</Link>
                            </li>
                            {/* <li>
                        <span>TAGS</span>: <Link to="">Giày {product.material}</Link>,<Link to="">{product.brand.nameBrand}</Link> 
                      </li> */}
                          </ul>
                          <div className="pd-share">
                            {/* <div className="p-code">Mã : 00012</div> */}
                            <div className="pd-social">
                              <a href="#">
                                <i className="ti-facebook" />
                              </a>
                              <a href="#">
                                <i className="ti-twitter-alt" />
                              </a>
                              <a href="#">
                                <i className="ti-linkedin" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-tab">
                      <div className="tab-item">
                        <ul className="nav" role="tablist">
                          <li>
                            <a
                              className="active"
                              data-toggle="tab"
                              href="#tab-1"
                              role="tab"
                            >
                              Mô tả sản phẩm
                            </a>
                          </li>
                          <li>
                            <a data-toggle="tab" href="#tab-2" role="tab">
                              Chi tiết về sản phẩm
                            </a>
                          </li>
                          {/* <li>
                                                <a data-toggle="tab" href="#tab-3" role="tab">
                                                    Customer Reviews (02)
                                                </a>
                                            </li> */}
                        </ul>
                      </div>
                      <div className="tab-item-content">
                        <div className="tab-content">
                          <div
                            className="tab-pane fade-in active"
                            id="tab-1"
                            role="tabpanel"
                          >
                            <div className="product-content">
                              <div className="row">
                                <div className="col-lg-7">
                                  <h5>Giới thiệu</h5>
                                  <p>{product.descriptionProduct}</p>
                                </div>
                                <div className="col-lg-5">
                                  <img src={product.imageMain} alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="tab-2"
                            role="tabpanel"
                          >
                            <div className="specification-table">
                              <table>
                                <tbody>
                                  <tr>
                                    <td className="p-catagory">
                                      Đánh giá khách hàng
                                    </td>
                                    <td>
                                      <div className="pd-rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star-o" />
                                        <span>(5)</span>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="p-catagory">Giá</td>
                                    <td>
                                      <div className="p-price">
                                        <CurrencyFormat
                                          value={
                                            (product.price *
                                              (100 -
                                                product.discount.percent)) /
                                            100
                                          }
                                        />{" "}
                                        đ
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td className="p-catagory">Thương hiệu</td>
                                    <td>
                                      <div className="p-stock">
                                        {product.brand.nameBrand}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="p-catagory">Chất liệu</td>
                                    <td>
                                      <div className="p-weight">
                                        {product.material}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="p-catagory">Size</td>
                                    <td>
                                      <div className="p-size">
                                        {product.size.size}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="p-catagory">Màu sắc</td>
                                    <td>
                                      <span className="p-code">
                                        {product.color.color}
                                      </span>
                                    </td>
                                  </tr>
                                  {/* <tr>
                              <td className="p-catagory">Mã sản phẩm</td>
                              <td>
                                <div className="p-code">00012</div>
                              </td> */}
                                  {/* </tr> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Related Products Section End */}
          <div className="related-products spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title">
                    <h2>Sản phẩm tương tự</h2>
                  </div>
                </div>
              </div>
              <Carousel
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={ true }
                autoPlaySpeed={2500}
                keyBoardControl={true}
                customTransition="transform 300ms ease-in-out"
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                
              >
                {similarProducts.map((product) => {
                  return (
                    <div className="" key={product.id}>
                      {product.quantity == 0 ? (
                        <div className="product-item">
                          <div className="pi-pic sold__out">
                            <div className="sold-out">
                              <img src="\img\hethang.webp" />
                            </div>
                            <img
                              src={product.imageMain}
                              alt=""
                              style={{ height: "220px" }}
                            />
                            <div className="icon">
                              <i className="icon_heart_alt" />
                            </div>
                            <ul>
                              <li className="w-icon active">
                                <a
                                  onClick={() => {
                                    handleSoutout();
                                  }}
                                >
                                  <i className="icon_bag_alt" />
                                </a>
                              </li>
                              <li className="quick-view">
                                <Link
                                  // to={`/detail-product/${product.id}`}
                                  onClick={() => {
                                    handleDetailProduct(product.id);
                                  }}
                                >
                                  <i className="fa fa-info-circle"></i> Chi tiết
                                </Link>
                              </li>
                              {/* <li className="w-icon">
                          <a href="#">
                            <i className="fa " />
                          </a>
                        </li> */}
                            </ul>
                          </div>
                          <div className="pi-text">
                            <div className="catagory-name">
                              {product.brand.nameBrand}
                            </div>

                            <h5 title={product.nameProduct}>
                              {product.nameProduct.substring(0, 20)}
                            </h5>

                            {product.discount.id == 1 ? (
                              <div className="product-price">
                                <CurrencyFormat value={product.price} />đ
                                <span></span>
                              </div>
                            ) : (
                              <div className="product-price">
                                <CurrencyFormat
                                  className="product-price"
                                  value={
                                    (product.price *
                                      (100 - product.discount.percent)) /
                                    100
                                  }
                                />
                                đ
                                <span>
                                  <CurrencyFormat value={product.price} />đ
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="product-item">
                          <div className="pi-pic">
                            <img
                              src={product.imageMain}
                              alt=""
                              style={{ height: "220px" }}
                            />
                            {product.discount.id == 1 ? (
                              <div className=""></div>
                            ) : (
                              <div className="sale pp-sale">
                                Sale {product.discount.percent} %
                              </div>
                            )}

                            <div className="icon">
                              <i className="icon_heart_alt" />
                            </div>
                            <ul>
                              <li className="w-icon active">
                                <a
                                  onClick={() => {
                                    handleAddToCart(
                                      product.id,
                                      product.nameProduct
                                    );
                                  }}
                                >
                                  <i className="icon_bag_alt" />
                                </a>
                              </li>
                              <li className="quick-view">
                                <Link
                                  // to={`/detail-product/${product.id}`}
                                  onClick={() => {
                                    handleDetailProduct(product.id);
                                  }}
                                >
                                  {" "}
                                  <i className="fa fa-info-circle"></i> Chi tiết
                                </Link>
                              </li>
                              {/* <li className="w-icon">
                            <a href="#">
                              <i className="fa " />
                            </a>
                          </li> */}
                            </ul>
                          </div>
                          <div className="pi-text">
                            <div className="catagory-name">
                              {product.brand.nameBrand}
                            </div>

                            <h5 title={product.nameProduct}>
                              {product.nameProduct.substring(0, 20)}
                            </h5>

                            {product.discount.id == 1 ? (
                              <div className="product-price">
                                <CurrencyFormat value={product.price} />đ
                                <span></span>
                              </div>
                            ) : (
                              <div className="product-price">
                                <CurrencyFormat
                                  className="product-price"
                                  value={
                                    (product.price *
                                      (100 - product.discount.percent)) /
                                    100
                                  }
                                />
                                đ
                                <span>
                                  <CurrencyFormat value={product.price} />đ
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>Không có sản phẩm</p>
          </div>
        </>
      )}
    </>
  );
}