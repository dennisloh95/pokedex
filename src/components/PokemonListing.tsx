import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../utils/config";
import Pagination from "./Pagination";
import PokemonCard, { PokemonCardSkeleton } from "./PokemonCard";
import { PokemonCardType } from "../utils/types";

const PokemonListing = ({
  pokemons,
  totalItems,
  loading,
}: {
  pokemons: PokemonCardType[];
  totalItems: number;
  loading?: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <>
            {new Array(8).fill(null).map((_, index) => (
              <PokemonCardSkeleton key={index} />
            ))}
          </>
        ) : pokemons.length ? (
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.index} data={pokemon} />
          ))
        ) : (
          <div className="p-3">
            <p className="font-semibold text-gray-600">No Pokémon Found.</p>
          </div>
        )}
      </div>
      <Pagination
        currentPage={parseInt(searchParams.get("page") || "1")}
        totalCount={totalItems}
        pageSize={ITEMS_PER_PAGE}
        onPageChange={(page) => setSearchParams({ page: page.toString() })}
      />
    </>
  );
};

export default PokemonListing;
