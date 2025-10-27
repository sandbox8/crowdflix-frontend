import { useMutation } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/userSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => {
      const auth = getAuth();
      await signOut(auth);
      // Clear stored tokens
      localStorage.removeItem("token");
      localStorage.removeItem("firebaseUid");
    },
    onSuccess: () => {
      dispatch(clearUser());
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
