import axios from "axios";
export const getAllSizes = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/public/product/size"
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};