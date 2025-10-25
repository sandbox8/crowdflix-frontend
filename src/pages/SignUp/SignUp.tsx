import { SignUpForm } from "@/pages/SignUp/components/SignUpForm/SignUpForm";

const SignUp = ({
  setActiveTab,
}: {
  setActiveTab: (tab: "signin" | "signup") => void;
}) => {
  return (
    <div className="flex w-full lg:w-auto items-center ">
      <div>
        <img
          src="/images/loginHero.png"
          className="w-full h-auto object-cover hidden lg:flex"
          alt="login"
        />
      </div>
      <div className="flex w-full lg:w-auto justify-center items-center lg:pr-20 pr-0">
        <SignUpForm setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default SignUp;
