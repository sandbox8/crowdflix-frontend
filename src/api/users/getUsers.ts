import { api } from "../config/axios";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data.data.data;
};

export const getMe = async () => {
  const response = await api.get("/users/findOne");
  return response.data.data;
};
