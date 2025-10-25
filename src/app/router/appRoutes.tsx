import { createBrowserRouter, Navigate } from "react-router";

import { OptimizedLandingPage } from "@/pages/Home/OptimizedLandingPage";
import { AppLayout } from "../layouts/AppLayout/AppLayout";
import { EnhancedDetails } from "@/pages/Details/EnhancedDetails";
import { Marketplace } from "@/pages/Marketplace/Marketplace";
import Payment from "@/pages/Payment/Payment";
import { PaymentSuccess, PaymentFailure } from "@/pages/Payment/PaymentPages";
import { Profile } from "@/pages/Profile/Profile";
import { PrivateRoute } from "./PrivateRoute";
import SpecificMoment from "@/pages/SpecificMoment/SpecififcMoment";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <OptimizedLandingPage />
      </AppLayout>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <AppLayout>
        <EnhancedDetails />
      </AppLayout>
    ),
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/payment/:id",
    element: (
      <PrivateRoute>
        <AppLayout>
          <Payment />
        </AppLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/payment/success",
    element: (
      <AppLayout>
        <PaymentSuccess />
      </AppLayout>
    ),
  },
  {
    path: "/payment/failure",
    element: (
      <AppLayout>
        <PaymentFailure />
      </AppLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <AppLayout>
          <Profile />
        </AppLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/specific-moment/:id",
    element: (
      <PrivateRoute>
        <AppLayout>
          <SpecificMoment />
        </AppLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
