import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../components/SignUpForm/schema";
import { setActiveTab } from "@/store/slices/authDrawerSlice";
import { useAppDispatch } from "@/shared/hooks/useRedux";
import { useRegister } from "@/shared/hooks/api/users/useAuth";

export const useSignUpForm = () => {
  const dispatch = useAppDispatch();
  const { mutate: register } = useRegister();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const { email, password, firstName, lastName } = values;

    await register(
      {
        email,
        password,
        firstName,
        lastName,
      },
      {
        onSuccess: () => {
          dispatch(setActiveTab("signin"));
        },
        onError: () => {
          form.setError("email", { message: "Registration failed." });
        },
      },
    );
  });

  return {
    form,
    onSubmit,
  };
};
