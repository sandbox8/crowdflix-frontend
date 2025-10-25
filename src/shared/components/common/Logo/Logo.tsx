import LogoSvg from "@/shared/assets/logo.svg?react";

export const Logo = () => {
  return (
    <div className="absolute top-[40px] left-[15px]">
      <div className="bg-[url('/images/logoBg.png')] w-[87px] h-[48px] rotate-180 bg-no-repeat bg-contain" />
      <LogoSvg className="absolute top-0 left-[32px] z-10" />
    </div>
  );
};
