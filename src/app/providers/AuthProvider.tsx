import { useGetMe } from "@/shared/hooks/api/users/getMe";
import { useAppDispatch } from "@/shared/hooks/useRedux";
import { clearUser, setUser } from "@/store/slices/userSlice";
import { useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: user } = useGetMe();
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
  }, [dispatch, user]);

  return <>{children}</>;
};
