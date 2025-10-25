import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "../../store";
import { Router } from "./RouterProvider";
import { AuthProvider } from "./AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SnackbarProvider />
            <Router />
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </MantineProvider>
    </Provider>
  );
};
