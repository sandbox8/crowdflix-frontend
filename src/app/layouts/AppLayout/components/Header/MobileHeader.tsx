import { AuthLayout } from "@/app/layouts/AuthLayout/AuthLayout";
import SignIn from "@/pages/SignIn/SignIn";
import SignUp from "@/pages/SignUp/SignUp";
import { Button } from "@/shared/components/common/Button/Button";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useRedux";
import { clearUser } from "@/store/slices/userSlice";
import { Avatar, Burger, Drawer, Menu } from "@mantine/core";
import Logo from "@shared/assets/logo.svg?react";
import clsx from "clsx";
import { Facebook, Instagram, Xrp } from "iconsax-reactjs";
import { useState } from "react";
import { Link, useLocation } from "react-router";

export const MobileHeader = () => {
  const [opened, setOpened] = useState(false);
  const [openedAuth, setOpenedAuth] = useState(false);
  const pathname = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
  };
  return (
    <header className="flex w-full items-center justify-between">
      <Burger
        color="white"
        opened={opened}
        onClick={() => setOpened(!opened)}
      />
      <Drawer
        classNames={{
          header: "hidden",
          body: "p-0 ",
          root: "p-0 absolute",
          content: "bg-[#1A1A1A]/70 backdrop-blur-xs rounded-b-3xl p-0",
        }}
        position="top"
        h={375}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Drawer.Body>
          <div className="flex  items-center justify-center flex-col gap-4">
            <div className="flex px-5 items-center pt-5 justify-between gap-4 w-full max-w-[545px]">
              <Burger
                color="white"
                opened={opened}
                onClick={() => setOpened(!opened)}
              />
              <Logo className="" />
              {user ? (
                <div className="flex items-center gap-2">
                  <Avatar
                    src={user.profile_picture_url}
                    name={user.username || ""}
                    size="lg"
                  />
                </div>
              ) : (
                <Button onClick={() => setOpenedAuth(true)}>Sign In</Button>
              )}
            </div>

            <div className="flex w-full flex-col px-5 gap-4 mt-[55px] items-center">
              <Link
                className={clsx(
                  "flex items-center justify-center py-3 h-[40px] border rounded-full shrink-0 w-full  bg-[#F51F2D26] border-[#FF4A3C] hover:bg-[#F51F2D26] hover:text-white transition-all duration-300 font-medium",
                  {
                    "bg-[#F51F2D26] border-[#FF4A3C] text-white":
                      pathname === "/my-collection",
                    "bg-transparent text-[#FFCBCD]":
                      pathname !== "/my-collection",
                  },
                )}
                to="/profile"
              >
                My Collection
              </Link>
              <div className="flex w-full gap-4 justify-center  text-white ">
                <Link
                  className={clsx(
                    "flex items-center justify-center py-3 h-[40px] border rounded-full  w-full  max-w-[160px] bg-[#F51F2D26] border-[#FF4A3C] hover:bg-[#F51F2D26] hover:text-white transition-all duration-300 font-medium",
                    {
                      "bg-[#F51F2D26] border-[#FF4A3C] text-white":
                        pathname === "/",
                      "bg-transparent text-[#FFCBCD]": pathname !== "/",
                    },
                  )}
                  to="/"
                >
                  Home
                </Link>
                <div className=" bg-gradient-to-b from-[#356FB4] w-full  to-[#693968] max-w-[160px] rounded-full flex items-center justify-center p-[1px]">
                  <Link
                    className={clsx(
                      "flex items-center justify-center py-3  rounded-full w-full max-w-[160px] h-[40px]  transition-all duration-300 font-medium",
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
            </div>

            <div className="flex   items-center gap-5 justify-end mt-30">
              <Instagram size={35} color="#85CBFF" />
              <Facebook size={35} color="#85CBFF" />
              <Xrp size={35} color="#85CBFF" />
            </div>
          </div>
        </Drawer.Body>
      </Drawer>

      <Link to="/">
        <Logo />
      </Link>

      {user ? (
        <div className="flex items-center gap-2">
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
                className="cursor-pointer"
                src={user.profile_picture_url}
                name={user.username || ""}
                size="lg"
              />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      ) : (
        <Button onClick={() => setOpenedAuth(true)}>Sign In</Button>
      )}

      <Drawer
        classNames={{
          body: "bg-inherit p-0",
          header: "hidden",
        }}
        opened={openedAuth}
        position="top"
        size="100%"
        onClose={() => setOpened(false)}
      >
        <AuthLayout onClose={() => setOpenedAuth(false)}>
          {activeTab === "signin" ? (
            <SignIn setActiveTab={setActiveTab} />
          ) : (
            <SignUp setActiveTab={setActiveTab} />
          )}
        </AuthLayout>
      </Drawer>
    </header>
  );
};
