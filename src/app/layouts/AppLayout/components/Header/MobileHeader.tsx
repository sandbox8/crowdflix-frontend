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
          body: "p-0",
          root: "p-0 absolute",
          content: "bg-gradient-to-br from-black to-black/95 backdrop-blur-xl border-b border-white/10",
        }}
        position="top"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Drawer.Body>
          <div className="flex items-center justify-center flex-col gap-8 py-8 px-5">
            {/* Header Row */}
            <div className="flex items-center justify-between w-full max-w-[545px]">
              <Burger
                color="white"
                opened={opened}
                onClick={() => setOpened(!opened)}
              />
              <Logo className="" />
              {user ? (
                <Menu
                  opened={isMenuOpen}
                  trigger="click"
                  position="bottom-end"
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
                  <Menu.Dropdown
                    classNames={{
                      dropdown: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10",
                      item: "text-white hover:bg-white/10",
                    }}
                  >
                    <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button 
                  onClick={() => setOpenedAuth(true)}
                  className="h-10 bg-gradient-to-r from-[#2AA2FD] to-[#1e90ff] hover:from-[#1e90ff] hover:to-[#2AA2FD] text-white font-bold uppercase tracking-wider"
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex w-full flex-col gap-3 max-w-[400px]">
              <Link
                to="/profile"
                onClick={() => setOpened(false)}
                className={clsx(
                  "flex items-center justify-center py-3 h-12 border-2 rounded-2xl w-full font-bold uppercase tracking-wider transition-all duration-300",
                  {
                    "bg-gradient-to-r from-[#2AA2FD] to-[#1e90ff] border-[#2AA2FD] text-white shadow-lg":
                      pathname === "/profile",
                    "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30":
                      pathname !== "/profile",
                  },
                )}
              >
                My Collection
              </Link>

              <Link
                to="/"
                onClick={() => setOpened(false)}
                className={clsx(
                  "flex items-center justify-center py-3 h-12 border-2 rounded-2xl w-full font-bold uppercase tracking-wider transition-all duration-300",
                  {
                    "bg-gradient-to-r from-[#2AA2FD] to-[#1e90ff] border-[#2AA2FD] text-white shadow-lg":
                      pathname === "/",
                    "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30":
                      pathname !== "/",
                  },
                )}
              >
                Home
              </Link>

              <Link
                to="/marketplace"
                onClick={() => setOpened(false)}
                className={clsx(
                  "flex items-center justify-center py-3 h-12 border-2 rounded-2xl w-full font-bold uppercase tracking-wider transition-all duration-300",
                  {
                    "bg-gradient-to-r from-[#2AA2FD] to-[#1e90ff] border-[#2AA2FD] text-white shadow-lg":
                      pathname === "/marketplace",
                    "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30":
                      pathname !== "/marketplace",
                  },
                )}
              >
                Marketplace
              </Link>
            </div>

            {/* Social Icons - Updated to blue */}
            <div className="flex items-center gap-6 mt-4">
              <a href="#" className="text-[#2AA2FD] hover:text-[#1e90ff] transition-colors">
                <Instagram size={28} />
              </a>
              <a href="#" className="text-[#2AA2FD] hover:text-[#1e90ff] transition-colors">
                <Facebook size={28} />
              </a>
              <a href="#" className="text-[#2AA2FD] hover:text-[#1e90ff] transition-colors">
                <Xrp size={28} />
              </a>
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
