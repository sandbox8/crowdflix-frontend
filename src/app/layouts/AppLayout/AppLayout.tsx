import { useMediaQuery } from "@mantine/hooks";
import { useLocation } from "react-router";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { MobileHeader } from "./components/Header/MobileHeader";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();

  // Check if we're on the landing page
  const isLandingPage = location.pathname === "/";

  return (
    <>
      <main
        className={`flex flex-col h-full min-h-screen w-full mx-auto justify-between py-4 ${
          isLandingPage
            ? "bg-black"
            : "bg-[url('/images/heroBg.png')] bg-cover bg-center bg-scale bg-no-repeat"
        }`}
      >
        <div className="flex flex-col relative items-center justify-center w-full max-w-[1440px] mx-auto px-5">
          {!isMobile && <Header />}
          {isMobile && <MobileHeader />}
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
};
