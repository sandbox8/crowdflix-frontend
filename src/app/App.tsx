import { Outlet } from "react-router";
import "./app.css";
import { AppProvider } from "./providers/AppPovider";
import { useEffect } from "react";
import { initFcl } from "@/pages/Payment/initFcl";

function App() {
  useEffect(() => {
    initFcl();
  }, []);
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}

export default App;
