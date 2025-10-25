import { Input } from "@/shared/components/form/Input";
import Logo from "@/shared/assets/logo.svg?react";
import { clsx } from "clsx";
import { Link } from "react-router";
import { Button } from "@/shared/components/common/Button/Button";
import { Facebook, Instagram, Xrp } from "iconsax-reactjs";

export const Footer = () => {
  return (
    <footer className="w-full relative flex flex-col  items-center justify-center bg-black min-h-[380px] p-5">
      <img
        src="/images/footerBg.png"
        alt="footer logo"
        className="absolute z-10 top-0 left-0 w-full h-full"
      />
      <div className="flex flex-col gap-[62px] max-w-[1400px] items-center justify-center w-full">
        <div className="flex flex-col lg:flex-row   items-center justify-between w-full z-10  gap-[35px]">
          <div className="w-full items-center flex flex-col lg:flex-row gap-[35px] lg:gap-20">
            <Logo />
            <div className="flex  gap-[15px] text-white">
              <Link
                className={clsx(
                  "flex items-center h-[40px] justify-center  border rounded-full w-[160px]  border-[#FF4A3C] hover:bg-[#F51F2D26] hover:text-white transition-all duration-300 font-medium bg-transparent text-[#FFCBCD]",
                )}
                to="/"
              >
                Explore
              </Link>
              <div className=" bg-gradient-to-b from-[#356FB4] to-[#693968] rounded-full flex items-center justify-center p-[1px]">
                <Link
                  className={clsx(
                    "flex items-center h-[40px] justify-center  rounded-full w-[160px]  transition-all duration-300 font-medium bg-black text-[#CBF6FF]",
                  )}
                  to="/"
                >
                  Trade
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row  w-full items-center gap-[5px] justify-end">
            <div className="w-full max-w-[335px]">
              <Input
                className="h-[40px] w-full"
                placeholder="Enter your email"
              />
            </div>
            <Button className="h-[40px]  w-full max-w-[335px]">
              Join our community
            </Button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row  items-center justify-between w-full z-10 gap-[55px]">
          <p className="text-[#85CBFF]/50">© 2025 CrowdFlix</p>

          <div className="flex flex-col lg:flex-row items-center gap-5">
            <p className="text-[#85CBFF]">Terms</p>

            <p className="text-[#85CBFF]">Privacy</p>
            <p className="text-[#85CBFF]">Cookies</p>
            <p className="text-[#85CBFF]">About</p>
            <p className="text-[#85CBFF]">FAQ</p>
            <p className="text-[#85CBFF]">Share with Letterboxd</p>
          </div>

          <div className="flex   items-center gap-5 justify-end">
            <Instagram size={24} color="#85CBFF" />
            <Facebook size={24} color="#85CBFF" />
            <Xrp size={24} color="#85CBFF" />
          </div>
        </div>
      </div>
    </footer>
  );
};
