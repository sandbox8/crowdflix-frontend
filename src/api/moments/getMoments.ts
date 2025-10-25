import { api } from "../config/axios";

/** ====== Atomic types ====== */
export type UFix64String = string; // напр. "200.00000000"
export type FlowAddress = `0x${string}`;

/** ====== Movie / Universe / Studio / Genre ====== */
export interface Studio {
  studio_id: string;
  name: string;
  founded_year: number | null;
  logo_url: string | null;
  parent_company: string | null;
  slug: string;
  created_at: string; // ISO
  updated_at: string; // ISO
}

export interface Universe {
  universe_id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  slug: string;
  created_at: string; // ISO
  updated_at: string; // ISO
}

export interface Genre {
  genre_id: string;
  name: string;
}

export interface Movie {
  movie_id: string;
  title: string;
  release_year: number;
  directorOrCreator?: string | null;
  poster_url: string | null;
  synopsis: string | null;
  slug: string;
  created_at: string; // ISO
  updated_at: string; // ISO
  studio?: Studio;
  universe?: Universe;
  genres?: Genre[];
}

/** ====== Character / Actor ====== */
export interface Actor {
  actor_id: string;
  name: string;
  profile_picture_url: string | null;
  birthdate: string | null; // ISO date (YYYY-MM-DD)
  bio: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Character {
  character_id: string;
  name: string;
  portrait_url: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
  actor?: Actor;
}

/** ====== Tags ====== */
export interface Tag {
  tag_id: string;
  name: string;
}

/** ====== Set (short) ====== */
export interface SetMomentSummary {
  moment_id: string;
  contract_moment_id?: string;
  title: string;
  timestamp: number;
  content_type: "video" | "image" | string;
  drop_date: string; // ISO date
  date_of_moment: string; // ISO date
  scene_category: string;
  tier: string;
  status: string;
  scene_type: string;
  video_url: string | null;
  poster_url: string | null;
  trailer_url: string | null;
  summary: string | null;
  slug: string;
  max_supply?: number | null;
  created_at: string;
  updated_at: string;
}

export interface MomentSet {
  set_id: string;
  contract_set_id?: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  moments?: SetMomentSummary[];
}

/** ====== Listings / Edition / Seller ====== */
export interface Edition {
  edition_id: string;
  serial_number: string; // "1", "2", "3", ...
  flow_token_id: string; // ID конкретного NFT у контракті
  status: "minted" | "burned" | string;
  listed_status: "listed" | "unlisted" | string;
  tier: string;
  minted_at: string; // ISO
}

export interface Seller {
  user_id: string;
  email: string | null;
  username: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  profile_picture_url: string | null;
  firebase_uid?: string | null;
  role: "admin" | "user" | string;
  wallet_address: FlowAddress | string; // "0x..."
  is_ready_to_buy: boolean;
  is_ready_to_sell: boolean;
  created_at: string; // ISO
  updated_at: string; // ISO
}

export interface Listing {
  listing_id: string;
  price: UFix64String; // "200.00000000"
  status: "active" | "sold" | "canceled" | string;
  listed_at: string; // ISO
  updated_at: string; // ISO
  edition: Edition;
  seller: Seller;
}

/** ====== Головний інтерфейс Moment ====== */
export interface Moment {
  moment_id: string;
  contract_moment_id?: string; // "6"
  title: string;
  timestamp: number;
  content_type: "video" | "image" | string;
  drop_date: string; // ISO date
  date_of_moment: string; // ISO date
  scene_category: string;
  tier: string; // "legendary" тощо
  status: string; // "added_to_set" тощо
  scene_type: string; // "team_assembly" тощо
  video_url: string | null;
  poster_url: string | null;
  trailer_url: string | null;
  summary: string | null;
  slug: string;
  max_supply?: number | null;
  totalItems?: number | null;
  created_at: string; // ISO
  updated_at: string; // ISO

  /** Доп. агрегації для маркетплейсу */
  soldCount?: number;
  activeListingsCount?: number;
  lowestAsk?: UFix64String | null; // "200.00000000"
  avgSale?: UFix64String | null;

  /** Звʼязки */
  movie: Movie;
  characters: Character[];
  tags: Tag[];
  set?: MomentSet;

  /** Маркетплейс */
  activeListings?: Listing[];
}

export const getMoments = async ({
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortOrder = "DESC",
  status,
  tier,
  search,
  characters,
  universe,
  price,
}: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  tier?: string;
  search?: string;
  characters?: string[];
  universe?: string[];
  price?: number;
}) => {
  const query = new URLSearchParams();

  query.append("page", page.toString());
  query.append("limit", limit.toString());
  query.append("sortBy", sortBy);
  query.append("sortOrder", sortOrder);
  if (status) query.append("status", status);
  if (tier) query.append("tier", tier);
  if (search) query.append("search", search);
  if (characters && characters.length > 0) {
    characters.forEach((id) => query.append("character", id));
  }
  if (universe && universe.length > 0) {
    universe.forEach((id) => query.append("universe", id));
  }
  if (price) query.append("min_price", price.toString());
  const response = await api.get(`/nfts/moments?${query.toString()}`);
  return response.data.data.data as Moment[];
};
