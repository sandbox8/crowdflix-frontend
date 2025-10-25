import * as fcl from "@blocto/fcl";
import { ensureAuthStrict, mutateWithReauth } from "./auth";
import {
  BUY_CADENCE,
  CANCEL_LISTING_CADENCE,
  EDIT_PRICE_LISTING_CADENCE,
  PREPARE_BUY_CADENCE,
  PREPARE_SELL_CADENCE,
  SELL_CADENCE,
} from "./cadence";
import { toUFix64 } from "./utils";
import { sell } from "@/api/marketplace/sell";
import { buy } from "@/api/marketplace/buy";
import { changePrice } from "@/api/marketplace/changePrice";
import { cancelListing } from "@/api/marketplace/cancelListing";
import { enqueueSnackbar } from "notistack";

export async function sendPrepareUserTransactionForBuy(
  setupWalletBlocto: (txId: string) => void,
) {
  await ensureAuthStrict();

  const txId = await mutateWithReauth(() => ({
    cadence: PREPARE_BUY_CADENCE,
    limit: 50,
  }));

  enqueueSnackbar("Transaction is in progress. It may take up to a minute.", {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    variant: "success",
  });
  setupWalletBlocto(txId);
  await fcl.tx(txId).onceSealed();
}

export async function sendTransactionForBuyNFT(
  sellerAddress: string,
  tokenID: string,
  listing_id: string,
  purchaseAmount: string,
) {
  await ensureAuthStrict();
  const amount = toUFix64(purchaseAmount);

  const txId = await mutateWithReauth(() => ({
    cadence: BUY_CADENCE,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: (arg: any, t: any) => [
      arg(sellerAddress, t.Address),
      arg(tokenID, t.UInt64),
      arg(amount, t.UFix64),
    ],
    limit: 200,
  }));
  buy({
    listing_id: listing_id,
    price: purchaseAmount,
    tx_hash: txId,
  });
  enqueueSnackbar("Transaction is in progress. It may take up to a minute.", {
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    variant: "success",
  });
  await fcl.tx(txId).onceSealed();
  return txId;
}

export async function sendPrepareUserTransactionForSell() {
  await ensureAuthStrict();

  const txId = await mutateWithReauth(() => ({
    cadence: PREPARE_SELL_CADENCE,
    limit: 50,
  }));

  enqueueSnackbar("Transaction is in progress. It may take up to a minute.", {
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    variant: "success",
  });
  await fcl.tx(txId).onceSealed();
  return txId;
}

export async function sendTransactionForSellNFT(
  flow_token_id: string,
  edition_id: string,
  price: string,
) {
  await ensureAuthStrict();
  const amount = toUFix64(price);

  const txId = await mutateWithReauth(() => ({
    cadence: SELL_CADENCE,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: (arg: any, t: any) => [
      arg(flow_token_id, t.UInt64),
      arg(amount, t.UFix64),
    ],
    limit: 200,
  }));

  await sell({
    edition_id,
    tx_hash: txId,
  });
  enqueueSnackbar("Transaction is in progress. It may take up to a minute.", {
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    variant: "success",
  });
  await fcl.tx(txId).onceSealed();
}

export async function sendTransactionForCancelListing(
  marketplace_listing_id: string,
  tokenID: string,
) {
  await ensureAuthStrict();

  const txId = await mutateWithReauth(() => ({
    cadence: CANCEL_LISTING_CADENCE,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: (arg: any, t: any) => [arg(tokenID, t.UInt64)],
    limit: 100,
  }));

  await cancelListing({
    marketplace_listing_id,
    tx_hash: txId,
  });
  enqueueSnackbar("Transaction is in progress. It may take up to a minute.", {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    variant: "success",
  });

  await fcl.tx(txId).onceSealed();

  return txId;
}

export async function sendTransactionForEditListingPrice(
  marketplace_listing_id: string,
  tokenID: string,
  newPrice: string,
) {
  await ensureAuthStrict();
  const amount = toUFix64(newPrice);

  const txId = await mutateWithReauth(() => ({
    cadence: EDIT_PRICE_LISTING_CADENCE,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: (arg: any, t: any) => [arg(tokenID, t.UInt64), arg(amount, t.UFix64)],
    limit: 100,
  }));

  await changePrice({
    marketplace_listing_id,
    tx_hash: txId,
  });
  enqueueSnackbar("Transaction is in progress. It may take up to a minute.", {
    autoHideDuration: 5000,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    variant: "success",
  });

  await fcl.tx(txId).onceSealed();

  return txId;
}
