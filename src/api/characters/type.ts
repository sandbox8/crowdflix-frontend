export interface Character {
  character_id: string;
  name: string;
  portrait_url: string;
  slug: string;
  created_at: string;
  updated_at: string;
  universe: {
    universe_id: string;
    name: string;
    description: string;
    logo_url: string;
    slug: string;
    created_at: string;
    updated_at: string;
  };
}
