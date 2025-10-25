import { api } from "../config/axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/users/sign-in", { email, password });
  return response.data.data;
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  const response = await api.post("/users/sign-up", {
    email,
    password,
    first_name: firstName.toLowerCase(),
    last_name: lastName.toLowerCase(),
    username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
  });
  return response.data.data;
};
