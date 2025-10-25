import { Logo } from "@/shared/components/common/Logo/Logo";
import Exit from "@/shared/assets/Exit.svg?react";

export const AuthLayout = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="flex flex-col h-screen w-screen  bg-[url('/images/heroBg.png')] bg-cover bg-center bg-scale  bg-no-repeat ">
      <div className="flex w-full items-center justify-center lg:justify-start">
        <Logo />

        <Exit
          onClick={onClose}
          className="absolute top-[40px] right-[40px] cursor-pointer"
        />
      </div>
      <div className="flex-1 flex items-center justify-center px-5 lg:px-0">
        {children}
      </div>
    </div>
  );
};
