const POKE_API = `https://pokeapi.co/api/v2/pokemon/`;
const POKE_SPECIES_API = `https://pokeapi.co/api/v2/pokemon-species/`;
const POKEMON_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const MAX_DEX_ID = 905;
const ITEMS_PER_PAGE = 20;
const DOTS: "..." = "...";
const CONTAINER_STYLE = "container mx-auto px-4";
const POKE_ABILITY_API = "https://pokeapi.co/api/v2/ability/?limit=327";
const MAX_LOCAL_IMG_SIZE = 200;

const TYPE_COLORS: Record<string, string> = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

export {
  POKE_API,
  MAX_DEX_ID,
  DOTS,
  POKEMON_SPRITE_URL,
  CONTAINER_STYLE,
  POKE_SPECIES_API,
  ITEMS_PER_PAGE,
  TYPE_COLORS,
  POKE_ABILITY_API,
  MAX_LOCAL_IMG_SIZE,
};
