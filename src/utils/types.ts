export interface PokemonInfoTypes {
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: { name: string };
    is_hidden: boolean;
  }[];
}

export interface PokemonSpeciesTypes {
  name: string;
  id: number;
  is_legendary: boolean;
  is_mythical: boolean;
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
}

export interface PokemonData {
  id: number;
  name: string;
  isLegendary: boolean;
  description: string;
  types: { name: string }[];
  abilities: { name: string; isHidden: boolean }[];
  height: number;
  weight: number;
  imageUrl: string;
}
export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonCardType {
  index: string;
  name: string;
  imageUrl: string;
}

export interface PaginationTypes {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

export interface FetchTypes<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

export type FetchActionTypes<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };
