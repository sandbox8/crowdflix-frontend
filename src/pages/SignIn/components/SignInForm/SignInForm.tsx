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
    <div className="flex w-full max-w-[520px] flex-col gap-4 lg:px-[60px] px-5 py-10 bg-[#1A1A1AB2]/70 backdrop-blur-xs rounded-[30px] lg:min-w-[440px] ">
      <div className="flex w-full items-center justify-center">
        <div className="relative  text-center font-bold text-white">
          <div className="absolute inset-0 bg-[url('/images/titleBg.png')] bg-no-repeat lg:ml-[14px] ml-2 mb-4  z-20" />
          <h1 className="relative text-[42px] leading-[44px] lg:text-[52px] lg:leading-[54px] z-10">
            Welcome
            <br />
            to Crowdflix!
          </h1>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[15px]">
        <Input
          {...register("email")}
          className=" w-full "
          placeholder="Email"
          error={errors.email?.message}
        />
        <PasswordInput
          {...passwordField}
          className=" w-full"
          placeholder="Password"
          error={errors.password?.message}
        />
      </div>
      <Button onClick={onSubmit}>Sign In</Button>
      <div className="flex items-center justify-center gap-1">
        <p className="text-white/60 ">Don't have an account? </p>

        <p
          className="text-[#85CBFF] cursor-pointer"
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </p>
      </div>
    </div>
  );
};
