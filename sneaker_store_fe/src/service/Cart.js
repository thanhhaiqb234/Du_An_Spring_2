import axios from "axios";

export const getCartByIdAccount = async (headers) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/user/shopping-cart`,
      { headers }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const addProductToCart = async (idProduct, headers) => {
  await axios.post(
    "http://localhost:8080/api/user/add-to-cart/" + idProduct,
    null,
    { headers }
  );
};
export const addProductToCartDetail = async (idProduct, num, headers) => {
  
    await axios.post(
      `http://localhost:8080/api/user/add-detail?id=${idProduct}&&quantity=${num}`,
      null,
      {
        headers,
      }
    );
};

export const minusProductToCart = async (idProduct, headers) => {
  try {
    await axios.post(
      "http://localhost:8080/api/user/minus/" + idProduct,
      null,
      {
        headers,
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const totalProductOnCart = async (headers) => {
  try {
    const res = await axios.get("http://localhost:8080/api/user/cart-item", {
      headers,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const deleteProductById = async (idProduct, headers) => {
  try {
    await axios.delete(
      "http://localhost:8080/api/user/cart-remove/" + idProduct,
      { headers }
    );
  } catch (e) {
    console.log(e);
  }
};