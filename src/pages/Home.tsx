import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { POKE_API, MAX_DEX_ID, CONTAINER_STYLE } from "../utils/config";
import { PokemonResult, PokemonCardType } from "../utils/types";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { getPokemonSpriteUrl } from "../utils/functions";

const Home = () => {
  const [pokemons, setPokemons] = useState<PokemonCardType[]>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(POKE_API);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");

  useEffect(() => {
    if (page) {
      let limit = 20;
      const offset = (parseInt(page) - 1) * 20;
      let test = Math.floor(MAX_DEX_ID / 20);
      if (parseInt(page) > test) {
        limit = MAX_DEX_ID - offset;
      }
      setCurrentPageUrl(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
      );
    }
  }, [page]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(currentPageUrl, { signal })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          const pokemonResult = data.results.map(
            ({ name, url }: PokemonResult) => {
              const index = url.split("/")[url.split("/").length - 2];
              return {
                index,
                name,
                imageUrl: getPokemonSpriteUrl(index),
              };
            }
          );
          setPokemons(pokemonResult);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      controller.abort();
    };
  }, [currentPageUrl]);

  return (
    <div className={CONTAINER_STYLE}>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons &&
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.index} data={pokemon} />
          ))}
      </div>
      <Pagination
        currentPage={parseInt(page || "1")}
        totalCount={MAX_DEX_ID}
        pageSize={20}
        onPageChange={(page) => setSearchParams({ page: page.toString() })}
      />
    </div>
  );
};

export default Home;
