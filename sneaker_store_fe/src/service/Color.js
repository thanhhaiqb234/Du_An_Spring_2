import axios from "axios";
export const getAllColors = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/public/product/color"
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};