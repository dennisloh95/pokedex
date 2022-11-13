import { CONTAINER_STYLE, MAX_DEX_ID } from "../utils/config";
import { useSearchParams } from "react-router-dom";
import { usePokemonListing } from "../utils/hooks";
import PokemonListing from "../components/PokemonListing";

const Home = () => {
  const [searchParams] = useSearchParams();
  const { pokemons } = usePokemonListing(searchParams.get("page"));

  return (
    <div className={CONTAINER_STYLE}>
      <PokemonListing pokemons={pokemons} totalItems={MAX_DEX_ID} />
    </div>
  );
};

export default Home;
