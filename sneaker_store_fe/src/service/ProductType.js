import axios from "axios";
export const getProductTypes = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/public/product/product-type"
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};  