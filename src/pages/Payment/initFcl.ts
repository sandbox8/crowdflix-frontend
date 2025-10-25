import * as fcl from "@blocto/fcl";

export function initFcl() {
  fcl
    .config()
    .put("flow.network", "testnet")
    .put("accessNode.api", "https://rest-testnet.onflow.org")
    // ВАРІАНТ A: агрегатор (рекомендую спочатку цей)
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
    .put("discovery.wallet.method", "POP/RPC")
    .put("app.detail.title", "Crowdflix")
    .put("app.detail.icon", `${location.origin}/icon-512.png`)
    .put("walletconnect.projectId", import.meta.env.VITE_WC_PROJECT_ID);
}
