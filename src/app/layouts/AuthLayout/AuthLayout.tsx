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
    <div className="flex flex-col h-screen w-screen bg-black">
      <div className="flex w-full items-center justify-center lg:justify-start p-8">
        <Logo />

        <Exit
          onClick={onClose}
          className="absolute top-[40px] right-[40px] cursor-pointer text-white hover:text-white/80 transition-colors"
        />
      </div>
      <div className="flex-1 flex items-center justify-center px-5 lg:px-0">
        {children}
      </div>
    </div>
  );
};
