import { useSearchParams } from "react-router-dom";
import { CONTAINER_STYLE, ITEMS_PER_PAGE } from "../utils/config";
import { useEffect, useMemo, useState } from "react";
import PokemonListing from "../components/PokemonListing";
import { useCustomPokemon } from "../store";

const CustomPokedex = () => {
  const [searchParams] = useSearchParams();
  const customPokemons = useCustomPokemon((state) => state.customPokemons);
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") || "1"
  );

  useEffect(() => {
    setCurrentPage(searchParams.get("page") || "1");
  }, [searchParams.get("page")]);

  const currentCustomPokedex = useMemo(() => {
    const firstPageIndex = (parseInt(currentPage) - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return customPokemons?.length
      ? customPokemons
          .slice(firstPageIndex, lastPageIndex)
          .map(({ id, name, imageUrl }) => ({
            index: id,
            name,
            imageUrl,
            isCustom: true,
          }))
      : [];
  }, [currentPage, customPokemons]);

  return (
    <div className={`${CONTAINER_STYLE} py-4`}>
      <PokemonListing
        pokemons={currentCustomPokedex}
        totalItems={customPokemons?.length || 0}
      />
    </div>
  );
};

export default CustomPokedex;
