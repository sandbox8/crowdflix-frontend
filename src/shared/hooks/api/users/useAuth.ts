import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/api/users/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.idToken);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({
      email,
      password,
      firstName,
      lastName,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => register(email, password, firstName, lastName),
  });
};
