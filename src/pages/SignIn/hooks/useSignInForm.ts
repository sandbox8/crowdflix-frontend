import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../components/SignInForm/schema";
import { useAppDispatch } from "@/shared/hooks/useRedux";
import { setIsOpen } from "@/store/slices/authDrawerSlice";
import { useLogin } from "@/shared/hooks/api/users/useAuth";
import { setUser } from "@/store/slices/userSlice";

export const useSignInForm = () => {
  const dispatch = useAppDispatch();
  const { mutate: login } = useLogin();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async ({ email, password }) => {
    login(
      {
        email,
        password,
      },
      {
        onSuccess: ({ user }) => {
          dispatch(setIsOpen(false));
          dispatch(setUser(user));
        },
        onError: () => {
          form.setError("email", { message: "Invalid email or password" });
        },
      },
    );
  });

  return {
    form,
    onSubmit,
  };
};
