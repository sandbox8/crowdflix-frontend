import { api } from "../config/axios";
import type { Moment } from "../moments/getMoments";

export interface Edition {
  edition_id: string;
  serial_number: string;
  flow_token_id: string;
  status: "minted" | "burned" | string;
  listed_status: "listed" | "unlisted" | string;
  tier: string;
  minted_at: string; // ISO
  moment: Moment;
  owner: {
    user_id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    display_name: string | null;
    profile_picture_url: null;
    firebase_uid: string;
    role: string;
    wallet_address: string;
    is_ready_to_buy: boolean;
    is_ready_to_sell: boolean;
    created_at: string;
    updated_at: string;
  };
}
export const getMyEditions = async (
  owner_id: string,
  status?: string,
  tier?: string,
  search?: string,
) => {
  const query = new URLSearchParams();

  if (status) query.append("status", status);
  if (tier) query.append("tier", tier);
  if (owner_id) query.append("owner_id", owner_id);
  if (search) query.append("search", search);
  const response = await api.get(`/nfts/editions?${query.toString()}`);
  return response.data.data.data as Edition[];
};
