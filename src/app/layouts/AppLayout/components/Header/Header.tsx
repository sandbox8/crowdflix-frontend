import { Button } from "@/shared/components/common/Button/Button";
import Logo from "@/shared/assets/logo.svg?react";
import clsx from "clsx";
import { Link, useLocation } from "react-router";
import { Avatar, Drawer, Menu } from "@mantine/core";
import { useState } from "react";
import SignIn from "@/pages/SignIn/SignIn";
import { AuthLayout } from "@/app/layouts/AuthLayout/AuthLayout";
import SignUp from "@/pages/SignUp/SignUp";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useRedux";
import { setActiveTab, setIsOpen } from "@/store/slices/authDrawerSlice";
import { clearUser } from "@/store/slices/userSlice";

export const Header = () => {
  const pathname = useLocation().pathname;
  const isOpen = useAppSelector((state) => state.authDrawer.isOpen);
  const activeTab = useAppSelector((state) => state.authDrawer.activeTab);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
  };

  return (
    <header className="flex w-full items-center justify-between ">
      <div className="flex w-[200px]">
        <div className="bg-[url('/images/logoBg.png')] w-[87px] h-[48px] rotate-180 bg-no-repeat bg-contain" />
        <Link to="/">
          <Logo className="absolute  left-[32px] z-10" />
        </Link>
      </div>
      <div className="flex gap-4 text-white">
        <Link
          className={clsx(
            "flex items-center justify-center py-3 border rounded-full w-[130px] bg-[#F51F2D26] border-[#FF4A3C] hover:bg-[#F51F2D26] hover:text-white transition-all duration-300 font-medium",
            {
              "bg-[#F51F2D26] border-[#FF4A3C] text-white": pathname === "/",
              "bg-transparent text-[#FFCBCD]": pathname !== "/",
            },
          )}
          to="/"
        >
          Home
        </Link>
        <div className=" bg-gradient-to-b from-[#356FB4] to-[#693968] rounded-full flex items-center justify-center p-[1px]">
          <Link
            className={clsx(
              "flex items-center justify-center py-3  rounded-full w-[130px]  transition-all duration-300 font-medium",
              {
                "bg-[#170B26] text-white": pathname === "/marketplace",
                " bg-black text-[#CBF6FF]": pathname !== "/marketplace",
              },
            )}
            to="/marketplace"
          >
            Marketplace
          </Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-2">
          <Link className="text-white" to="/profile">
            My Collection
          </Link>
          <Menu
            opened={isMenuOpen}
            trigger="click"
            position="bottom-end"
            arrowPosition="center"
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => setIsMenuOpen(false)}
          >
            <Menu.Target>
              <Avatar
                className="cursor-pointer ring-2 ring-[#2AA2FD]/40 hover:ring-[#2AA2FD]/60 transition-all"
                src={user.profile_picture_url}
                name={user.display_name || ""}
                size="lg"
              />
            </Menu.Target>
            <Menu.Dropdown
              classNames={{
                dropdown: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10",
              }}
            >
              <Menu.Item 
                onClick={handleLogout}
                className="text-white hover:bg-white/10 font-bold uppercase tracking-wider"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      ) : (
        <Button
          className="w-[130px] h-[48.8px]"
          onClick={() => dispatch(setIsOpen(true))}
        >
          Sign In
        </Button>
      )}

      <Drawer
        classNames={{
          body: "bg-inherit p-0",
          header: "hidden",
        }}
        opened={isOpen}
        position="top"
        size="100%"
        onClose={() => dispatch(setIsOpen(false))}
      >
        <AuthLayout onClose={() => dispatch(setIsOpen(false))}>
          {activeTab === "signin" ? (
            <SignIn setActiveTab={(tab) => dispatch(setActiveTab(tab))} />
          ) : (
            <SignUp setActiveTab={(tab) => dispatch(setActiveTab(tab))} />
          )}
        </AuthLayout>
      </Drawer>
    </header>
  );
};
