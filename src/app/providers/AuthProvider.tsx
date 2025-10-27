import { useGetMe } from "@/shared/hooks/api/users/getMe";
import { useAppDispatch } from "@/shared/hooks/useRedux";
import { clearUser, setUser } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { auth } from "@/api/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: user } = useGetMe();
  const [authReady, setAuthReady] = useState(false);

  // Wait for Firebase auth to be ready
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Auth state is now ready
      setAuthReady(true);
      
      // If Firebase user exists but token is missing, get it
      if (firebaseUser) {
        firebaseUser.getIdToken().then((token) => {
          localStorage.setItem("token", token);
        }).catch((error) => {
          console.error("Error getting token on auth state change:", error);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
  }, [dispatch, user]);

  // Don't render children until Firebase auth is ready
  if (!authReady) {
    return null;
  }

  return <>{children}</>;
};
