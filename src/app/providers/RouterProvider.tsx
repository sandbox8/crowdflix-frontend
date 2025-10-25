import { RouterProvider } from "react-router";

import { appRoutes } from "../router/appRoutes";

export const Router = () => {
  return <RouterProvider router={appRoutes} />;
};
