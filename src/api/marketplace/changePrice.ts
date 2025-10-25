import { api } from "../config/axios";

export const changePrice = async ({
  marketplace_listing_id,
  tx_hash,
}: {
  marketplace_listing_id: string;
  tx_hash: string;
}) => {
  const response = await api.post(
    `/nfts/marketplace/user-listing/change-price`,
    {
      marketplace_listing_id,
      tx_hash,
    },
  );
  return response.data.data;
};
