import constants from "../constants/constants";
import axios from "axios";

export const userRegister = async (userData) => {
  const res = await axios.post(`${constants.BASE_URL}/user/create`, userData);
  return res;
};

export const userLogin = async (userData) => {
  const res = await axios.post(`${constants.BASE_URL}/user/login`, userData);
  return res;
};

export const userAuth = async (token) => {
  const headers = {
    Authorization: "Bearer " + token,
  };
  const res = await axios.get(`${constants.BASE_URL}/user/auth`, {}, headers);
  return res;
};
