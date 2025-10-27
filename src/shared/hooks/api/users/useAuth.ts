import { useMutation } from "@tanstack/react-query";
import { login, register } from "@/api/users/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.idToken);
      
      // Store Firebase UID if available
      if (data.user?.firebase_uid) {
        localStorage.setItem("firebaseUid", data.user.firebase_uid);
      } else if (data.user?.id) {
        localStorage.setItem("firebaseUid", data.user.id);
      }
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
    onSuccess: (data) => {
      localStorage.setItem("token", data.idToken);
      
      // Store Firebase UID if available
      if (data.user?.firebase_uid) {
        localStorage.setItem("firebaseUid", data.user.firebase_uid);
      } else if (data.user?.id) {
        localStorage.setItem("firebaseUid", data.user.id);
      }
    },
  });
};
