import { useParams } from "react-router-dom";
import { usePokemonInfo } from "../utils/hooks";

import PokemonDetail, {
  PokemonDetailSkeleton,
} from "../components/PokemonDetail";

const Pokemon = () => {
  const { pokemonIndex } = useParams<keyof { pokemonIndex: string }>() as {
    pokemonIndex: string;
  };

  const { pokemonData } = usePokemonInfo(pokemonIndex);
  if (!pokemonData) {
    return <PokemonDetailSkeleton />;
  } else {
    return <PokemonDetail {...pokemonData} />;
  }
};

export default Pokemon;
