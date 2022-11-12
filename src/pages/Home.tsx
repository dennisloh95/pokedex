import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { pokemonApi } from "../utils/config";
import { PokemonResult, PokemonCardType } from "../utils/types";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [pokemons, setPokemons] = useState<PokemonCardType[]>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(pokemonApi);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

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
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`,
              };
            }
          );
          setPokemons(pokemonResult);
          setNextPage(data.next);
          setPrevPage(data.previous);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      controller.abort();
    };
  }, [currentPageUrl]);

  const handlePageChange = (page: string | null) => {
    if (page == null) return;
    setCurrentPageUrl(page);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold py-3">Pokedex</h1>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons &&
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.index} data={pokemon} />
          ))}
      </div>
      <div>
        <button
          className="bg-blue-700 white m-3 p-3"
          disabled={prevPage == null ? true : false}
          onClick={() => handlePageChange(prevPage)}
        >
          Prev
        </button>
        <button
          className="bg-blue-700 white m-3 p-3"
          disabled={nextPage == null ? true : false}
          onClick={() => handlePageChange(nextPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
