import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Slider from "react-slider";
import { getAllBrand } from "../service/Brand";
import CurrencyFormat from "../format/Format";
import { getAllProducts, getProducts, sortProduct } from "../service/Product";
import { getProductTypes } from "../service/ProductType";
import { getAllColors } from "../service/Color";
import { getAllSizes } from "../service/Size";
import { addProductToCart, totalProductOnCart } from "../service/Cart";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateCart } from "../store/actions/cartActions";
import Swal from "sweetalert2";
export default function Shop() {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    document.title = "Sản phẩm";
  }, []);
  const param = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState(param.data);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [priceStr, setPriceStr] = useState("");
  const [priceEnd, setPriceEnd] = useState("");
  const [code, setCode] = useState(0);

  //back-top-top
  const [showsScrolBtn, setShowScrolBtn] = useState(false);

  //get brand Product
  const getNameBrand = () => {
    setBrand(param.data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleButtonVisibility = () => {
      window.pageYOffset > 300 ? setShowScrolBtn(true) : setShowScrolBtn(false);
    };

    window.addEventListener("scroll", handleButtonVisibility);
    return () => {
      window.addEventListener("scroll", handleButtonVisibility);
    };
  }, []);
  //
  const switchCase = async (page) => {
    let priceStart = 0,
      priceEnd = 0;
    switch (price) {
      case "1":
        priceStart = 0;
        priceEnd = 1000000;
        break;
      case "2":
        priceStart = 1000000;
        priceEnd = 5000000;
        break;
      case "3":
        priceStart = 5000000;
        priceEnd = 10000000;
        break;
      case "4":
        priceStart = 10000000;
        priceEnd = 50000000;
        break;
      default:
        priceStart = "";
        priceEnd = "";
    }
    setProducts(
      await getProducts(
        page,
        name,
        selectedOption1,
        brand,
        selectedOption3,
        selectedOption4,
        priceStart,
        priceEnd,
        code
      )
    );
    window.scrollTo(0, 200);
  };

  // phân trang

  const nextPage = async () => {
    const newPage = page + 1;
    console.log(selectedOption1);
    if (newPage < products.totalPages && code != "") {
      setPage(page + 1);
      switchCase(newPage);
    }
  };
  const previousPage = async () => {
    const newPage = page - 1;
    if (newPage >= 0) {
      setPage(page - 1);
      switchCase(newPage);
    }
  };
  //GET list producT
  const getFirstListProduct = async (page) => {
    setPage(page);
    switchCase(page);
  };

  const searchProductPlus = async () => {
    setPage(0);
    switchCase(0);
  };

  /// hết hàng
  const handleSoutout = () => {
   Swal.fire({
      icon:"warning",
      title:"Hiện tại sản phẩm đã hết hàng!!",
      timer:2000,
      showConfirmButton:false
    });
  };

  //add-to-cart
  const handleAddToCart = async (id, name) => {
    console.log(localStorage.getItem("username"));
    if (localStorage.getItem("username") == null) {
       Swal.fire({
        title:"Đăng nhập để thêm vào giỏ hàng",
        icon :"warning",
        timer:2000,
        showConfirmButton:false
      });
    } else {
      try {
        await addProductToCart(id, headers);
        toast.success(`Đã thêm ${name} vào giỏ`, {
          position: "top-right",
          autoClose: 1000,
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
          icon:"warning",
          title:"Số lượng sản phẩm không đủ",
          showConfirmButton:false,
          timer:2000
        });
      }
    }
  };

  //getTypeProduct
  const [productTypes, setProductTypes] = useState([]);
  const getTypeProduct = async () => {
    const result = await getProductTypes();
    setProductTypes(result);
  };
  // getColor
  const [colors, setColors] = useState([]);
  const getColors = async () => {
    const result = await getAllColors();
    setColors(result);
  };
  // get size
  const [sizes, setSizes] = useState([]);
  const getSize = async () => {
    const size = await getAllSizes();
    setSizes(size);
  };
  //reset filter
  const handleReset = async () => {
    setSelectedOption1("");
    setSelectedOption3("");
    setSelectedOption4("");
    setPrice("");
    setFlag(!flag);
  };
  const [price, setPrice] = useState("");

  //chọn giá
  const chosePrice = async () => {
    const data = document.getElementById("price").value;
    setPrice(data);
  };

  useEffect(() => {
    getFirstListProduct(0);
  }, [flag, brand]);

  useEffect(() => {
    getNameBrand();
  }, [param.data]);

  useEffect(() => {
    getTypeProduct();
    getColors();
    getSize();
  }, []);

  //radio bộ sưu tập
  const [selectedOption1, setSelectedOption1] = useState("");

  const handleOptionChangeCollection = (event) => {
    setSelectedOption1(event.target.value);
  };

  //radio màu
  const [selectedOption3, setSelectedOption3] = useState("");
  const handleOptionChangeColor = (event) => {
    setSelectedOption3(event.target.value);
  };
  const setCodeFunction = async () => {
    const codeSearch = document.getElementById("sortingSelect").value;
    setCode(codeSearch);
  };

  //radio size
  const [selectedOption4, setSelectedOption4] = useState("");
  const handleOptionChangeSize = (event) => {
    setSelectedOption4(event.target.value);
  };
  // console.log(products);

  if (products == null) {
    return null;
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <Link to="/home">
                  <i className="fa fa-home" /> Trang chủ
                </Link>
                <Link to="/shop">
                  <i className="fa fa-product-hunt" /> Sản phẩm
                </Link>
                <span>{brand}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="product-shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
              <button
                className="reset-btn"
                onClick={async () => {
                  handleReset();
                }}
              >
                Bỏ lọc
              </button>
              <div className="filter-widget">
                <h4 className="fw-title mt-4">Bộ sưu tập</h4>
                <div className="fw-brand-check">
                  {productTypes &&
                    productTypes.map((type) => {
                      return (
                        <div className="bc-item" key={type.id}>
                          <label htmlFor={"type_" + `${type.id}`}>
                            {type.productType}
                            <input
                              type="radio"
                              id={`type_${type.id}`}
                              value={type.productType}
                              checked={selectedOption1 == type.productType}
                              onChange={handleOptionChangeCollection}
                            />
                            <span className="checkmark" />
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* <div className="filter-widget">
                <h4 className="fw-title">Thương hiệu</h4>
                <div className="fw-brand-check">
                  {brands != null &&
                    brands.map((brand) => {
                      return (
                        <div className="bc-item" key={brand.id}>
                          <label htmlFor={brand.nameBrand}>
                            {brand.nameBrand}
                            <input
                              type="radio"
                              id={brand.nameBrand}
                              value={brand.nameBrand}
                              checked={selectedOption2 == brand.nameBrand}
                              onChange={handleOptionChangeBrand}
                            />
                            <span className="checkmark" />
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div> */}
              <div className="filter-widget">
                <h4 className="fw-title">Giá</h4>
                <div className="filter-range-wrap">
                  <select
                    className="select-price"
                    id="price"
                    onChange={() => {
                      chosePrice();
                    }}
                  >
                    <option value={""}>Chọn giá</option>
                    <option value={"1"}>Dưới 1 triệu</option>
                    <option value={"2"}>Từ 1-5 triệu</option>
                    <option value={"3"}>Từ 5-10 triệu</option>
                    <option value={"4"}>Trên 10 triệu</option>
                  </select>
                </div>
              </div>
              <div className="filter-widget">
                <h4 className="fw-title">Màu sắc</h4>
                <div className="fw-color-choose">
                  {colors &&
                    colors.map((color) => {
                      return (
                        <div className="cs-item" key={color.id}>
                          <input
                            type="radio"
                            id={color.code}
                            value={color.color}
                            checked={selectedOption3 == color.color}
                            onChange={handleOptionChangeColor}
                          />
                          <label className={color.code} htmlFor={color.code}>
                            {color.color}
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="filter-widget">
                <h4 className="fw-title">Size</h4>
                <div className="fw-size-choose">
                  {sizes &&
                    sizes.map((size) => {
                      return (
                        <div className="sc-item" key={size.id}>
                          <input
                            type="radio"
                            id={size.size}
                            value={size.size}
                            checked={selectedOption4 == size.size}
                            onChange={handleOptionChangeSize}
                          />
                          <label htmlFor={size.size}>{size.size}</label>
                        </div>
                      );
                    })}
                </div>
                <button
                  className="filter-btn"
                  onClick={async () => {
                    await setCodeFunction().then(await searchProductPlus());
                  }}
                >
                  Tìm kiếm
                </button>
              </div>

              <div className="filter-widget">
                <h4 className="fw-title">Tags</h4>
                <div className="fw-tags">
                  {/* <a href="#">Towel</a>
                                        <a href="#">Shoes</a>
                                        <a href="#">Coat</a>
                                        <a href="#">Dresses</a>
                                        <a href="#">Trousers</a>
                                        <a href="#">Men's hats</a>
                                        <a href="#">Backpack</a> */}
                </div>
              </div>
            </div>
            <div className="col-lg-9 order-1 order-lg-2">
              <div className="product-show-option">
                <div className="row">
                  <div className="col-lg-7 col-md-7">
                    <div className="select-option">
                      <select
                        className="sorting"
                        onChange={() => searchProductPlus()}
                        id="sortingSelect"
                      >
                        <option value={"0"}>Sắp xếp</option>
                        <option value={"4"}>Giá cao đến thấp</option>
                        <option value={"3"}>Giá thấp đến cao</option>
                        <option value={"1"}>Tên A-Z </option>
                        <option value={"2"}>Tên Z-A</option>
                      </select>
                      <button
                        className="btn-sort"
                        onClick={async () => {
                          await setCodeFunction().then(
                            await searchProductPlus()
                          );
                        }}
                      >
                        Sắp xếp
                      </button>
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-5 text-right">
                    <p>
                      Kết quả tìm kiếm có
                      <span className="quantity">
                        {products.totalElements}
                      </span>{" "}
                      sản phẩm
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-list">
                {products.numberOfElements == 0 ? (
                  <>
                    <div className="not-data">Không có dữ liệu</div>
                  </>
                ) : (
                  <div className="row">
                    {products.content != null &&
                      products.content.map((product) => {
                        return (
                          <div className="col-lg-4 col-sm-6" key={product.id}>
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
                                        to={`/detail-product/${product.id}`}
                                      >
                                        {" "}
                                        <i className="fa fa-info-circle"></i>{" "}
                                        Chi tiết
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
                                        <CurrencyFormat value={product.price} />
                                        đ
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
                                        to={`/detail-product/${product.id}`}
                                      >
                                        {" "}
                                        <i className="fa fa-info-circle"></i>{" "}
                                        Chi tiết
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
                                        <CurrencyFormat value={product.price} />
                                        đ
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
              {products.totalPages > 1 && (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="ps-pagination">
                    <ul className="pagination justify-content-center">
                      {page > 0 && (
                        <>
                          <li className="page-item">
                            <a
                              className="page-link"
                              rel="noindex, nofollow"
                              onClick={() => {
                                getFirstListProduct(0);
                              }}
                            >
                              &lt;&lt;
                            </a>
                          </li>
                          <li class="page-item">
                            <a
                              class="page-link"
                              rel="noindex, nofollow"
                              onClick={() => {
                                previousPage();
                              }}
                            >
                              &lt;
                            </a>
                          </li>
                        </>
                      )}
                      {Array.from(
                        { length: products.totalPages },
                        (_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              page === index ? "active" : ""
                            }`}
                          >
                            <a
                              className="page-link"
                              rel="noindex, nofollow"
                              onClick={() => {
                                getFirstListProduct(index);
                              }}
                            >
                              {index + 1}
                            </a>
                          </li>
                        )
                      )}
                      {page < products.totalPages - 1 && (
                        <>
                          <li className="page-item">
                            <a
                              className="page-link"
                              rel="noindex, nofollow"
                              onClick={() => {
                                nextPage();
                              }}
                            >
                              &gt;
                            </a>
                          </li>
                          <li class="page-item">
                            <a
                              class="page-link"
                              rel="noindex, nofollow"
                              onClick={() => {
                                getFirstListProduct(products.totalPages - 1);
                                window.scrollTo(0, 3);
                              }}
                            >
                              &gt;&gt;
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
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