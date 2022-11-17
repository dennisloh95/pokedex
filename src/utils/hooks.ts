import { useState, useEffect, useRef, useMemo, useReducer } from "react";
import { DOTS, POKE_API, POKE_SPECIES_API } from "./config";
import {
  cleanUpPokemonAbility,
  convertDecimeterToCentimeter,
  convertHectogramstoKilograms,
  getPaginationUrl,
  getPokemonDescription,
  getPokemonSpriteUrl,
  range,
} from "./helpers";
import {
  FetchActionTypes,
  FetchTypes,
  PaginationTypes,
  PokemonCardType,
  PokemonData,
  PokemonInfoTypes,
  PokemonResult,
  PokemonSpeciesTypes,
} from "./types";
import { useCustomPokemon } from "../store";

const useDebounce = <T>(val: T, delay?: number): T => {
  const [value, setVal] = useState<T>(val);

  useEffect(() => {
    let timer: any;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setVal(val);
      timer = null;
    }, delay || 500);

    return () => clearTimeout(timer);
  }, [val, delay]);

  return value;
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: PaginationTypes) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

type Cache<T> = { [url: string]: T };

const useFetch = <T = unknown>(
  url?: string,
  options?: RequestInit
): FetchTypes<T> => {
  const cache = useRef<Cache<T>>({});

  const cancelRequest = useRef<boolean>(false);

  const initialState: FetchTypes<T> = {
    data: undefined,
    error: undefined,
    loading: true,
  };

  // refererence from https://usehooks-ts.com/react-hook/use-fetch, but add loading state
  const fetchReducer = (
    state: FetchTypes<T>,
    action: FetchActionTypes<T>
  ): FetchTypes<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, loading: true };
      case "fetched":
        return { ...initialState, data: action.payload, loading: false };
      case "error":
        return { ...initialState, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;
    cancelRequest.current = false;
    const fetchData = async () => {
      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(response.status.toString());
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;
        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;
        dispatch({ type: "error", payload: error as Error });
      }
    };
    fetchData();
    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
};

const usePokemonListing = <T>(page?: T) => {
  const [pokemons, setPokemons] = useState<PokemonCardType[]>([]);

  if (page && page < 1) {
    throw new Error("No Pokémon data found.");
  }

  const { data, error, loading } = useFetch<{
    results: PokemonResult[];
  }>(getPaginationUrl(page));

  useEffect(() => {
    if (data?.results) {
      const pokemonResult = data.results.map(({ name, url }) => {
        const index = url.split("/")[url.split("/").length - 2];
        return {
          index,
          name,
          imageUrl: getPokemonSpriteUrl(index),
        };
      });
      setPokemons(pokemonResult);
    }
  }, [data]);

  return { pokemons, error, loading };
};

const usePokemonInfo = (index: string) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const customPokemons = useCustomPokemon((state) => state.customPokemons);

  if (index.includes("-c") && customPokemons?.length) {
    const result = customPokemons.filter((pokemon) => pokemon.id === index)[0];
    if (result === undefined) {
      throw new Error("No Pokémon data found.");
    }
    return { pokemonData: result, loading: false };
  }

  const {
    data: pokeInfo,
    loading: pokeInfoLoading,
    error: pokeInfoError,
  } = useFetch<PokemonInfoTypes>(`${POKE_API}${index}`);
  const {
    data: pokeSpecies,
    loading: pokeSpeciesLoading,
    error: pokeSpeciesError,
  } = useFetch<PokemonSpeciesTypes>(`${POKE_SPECIES_API}${index}`);

  useEffect(() => {
    if (pokeInfoError || pokeSpeciesError) {
      throw new Error("No Pokémon data found.");
    }
    if (pokeInfo && pokeSpecies) {
      setPokemonData({
        id: pokeSpecies.id.toString(),
        name: pokeSpecies.name,
        isLegendary: pokeSpecies.is_legendary || pokeSpecies.is_mythical,
        description: getPokemonDescription(pokeSpecies.flavor_text_entries),
        types: pokeInfo.types.map((typ) => ({ name: typ.type.name })),
        abilities: pokeInfo.abilities.map((ability) => ({
          name: cleanUpPokemonAbility(ability.ability.name),
          isHidden: ability.is_hidden,
        })),
        height: convertDecimeterToCentimeter(pokeInfo.height),
        weight: convertHectogramstoKilograms(pokeInfo.weight),
        imageUrl: getPokemonSpriteUrl(index),
      });
    }
  }, [pokeInfo, pokeSpecies, pokeInfoError, pokeSpeciesError]);

  return { pokemonData, loading: pokeInfoLoading || pokeSpeciesLoading };
};

export {
  useDebounce,
  usePagination,
  useFetch,
  usePokemonListing,
  usePokemonInfo,
};
