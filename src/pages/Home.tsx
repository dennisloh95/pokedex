import PokemonCard from "../components/PokemonCard";
import { MAX_DEX_ID, CONTAINER_STYLE } from "../utils/config";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { usePokemonListing } from "../utils/hooks";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pokemons } = usePokemonListing(searchParams.get("page"));

  return (
    <div className={CONTAINER_STYLE}>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.index} data={pokemon} />
        ))}
      </div>
      <Pagination
        currentPage={parseInt(searchParams.get("page") || "1")}
        totalCount={MAX_DEX_ID}
        pageSize={20}
        onPageChange={(page) => setSearchParams({ page: page.toString() })}
      />
    </div>
  );
};

export default Home;
