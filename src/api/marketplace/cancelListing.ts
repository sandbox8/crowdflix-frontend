import { api } from "../config/axios";

export const cancelListing = async ({
  marketplace_listing_id,
  tx_hash,
}: {
  marketplace_listing_id: string;
  tx_hash: string;
}): Promise<void> => {
  const response = await api.post(
    `/nfts/marketplace/user-listing/cancel-listing`,
    {
      marketplace_listing_id,
      tx_hash,
    },
  );
  return response.data.data;
};
