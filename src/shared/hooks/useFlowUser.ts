// useFlowUser.ts
import * as fcl from "@blocto/fcl";
import { useState, useEffect } from "react";

interface FlowUser {
  addr?: string;
  loggedIn: boolean | null;
}

export function useFlowUser() {
  const [user, setUser] = useState<FlowUser>({ loggedIn: null });

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  const login = () => fcl.authenticate();
  const logout = () => fcl.unauthenticate();

  return { user, login, logout };
}
