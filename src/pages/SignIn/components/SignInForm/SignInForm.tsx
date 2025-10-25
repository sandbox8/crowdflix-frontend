import { Button } from "@/shared/components/common/Button/Button";
import { Input } from "@/shared/components/form/Input/Input";
import { PasswordInput } from "@/shared/components/form/PasswordInput";
import { useSignInForm } from "../../hooks/useSignInForm";
import { useController } from "react-hook-form";

export const SignInForm = ({
  setActiveTab,
}: {
  setActiveTab: (tab: "signin" | "signup") => void;
}) => {
  const { form, onSubmit } = useSignInForm();

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { field: passwordField } = useController({
    control,
    name: "password",
  });

  return (
    <div className="flex w-full max-w-[520px] flex-col gap-6 lg:px-12 px-6 py-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 lg:min-w-[440px]">
      <div className="text-center mb-2">
        <h1 className="font-black text-4xl lg:text-5xl uppercase mb-2 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-white/60 text-sm">
          Sign in to access your collection
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Input
          {...register("email")}
          className="w-full"
          placeholder="Email"
          error={errors.email?.message}
        />
        <PasswordInput
          {...passwordField}
          className="w-full"
          placeholder="Password"
          error={errors.password?.message}
        />
      </div>

      <Button 
        onClick={onSubmit}
        className="w-full h-12 bg-gradient-to-r from-[#2AA2FD] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2AA2FD] text-white font-black uppercase tracking-wider transition-all hover:scale-[1.02]"
      >
        Sign In
      </Button>

      <div className="flex items-center justify-center gap-1 text-sm">
        <p className="text-white/60">Don't have an account?</p>
        <p
          className="text-[#2AA2FD] cursor-pointer hover:text-[#1e90ff] font-bold transition-colors"
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </p>
      </div>
    </div>
  );
};
