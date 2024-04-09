import axios from "axios";
export const getInfoUser = async (email) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/user?email=${email}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getOrderDetail = async (idOrder) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/user/order?id=${idOrder}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getHistoryOrder = async (email, page) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/user/order/list-order?email=${email}&&page=${page}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllOrderByAccount = async (email) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/user/order/list?email=${email}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const registerAcc = async (signUpForm) => {
  const result = await axios.post(`http://localhost:8080/api/public/signup`, {
    ...signUpForm,
  });
  return result.data;
};