export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
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
