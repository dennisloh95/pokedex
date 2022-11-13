import create from "zustand";
import { PokemonData } from "../utils/types";
import { persist } from "zustand/middleware";

interface CustomPokemonState {
  customPokemons: PokemonData[];
  totalCreated: number;
  getCustomPokemon: (id: string) => PokemonData | undefined;
  addCustomPokemon: (pokemon: PokemonData) => void;
  deleteCustomPokemon: (id: string) => void;
  editCustomPokemon: (pokemon: PokemonData) => void;
}

const useCustomPokemon = create<CustomPokemonState>()(
  persist(
    (set, get) => ({
      customPokemons: [],
      totalCreated: 0,
      getCustomPokemon: (id: string) => {
        const results = get().customPokemons.filter(
          (pokemon) => pokemon.id === id
        );
        return results.length ? results[0] : undefined;
      },
      addCustomPokemon: (data: PokemonData) => {
        set((state) => ({
          customPokemons: [...state.customPokemons, data],
          totalCreated: get().totalCreated + 1,
        }));
      },
      deleteCustomPokemon: (id: string) => {
        set((state) => ({
          customPokemons: state.customPokemons.filter(
            (pokemon) => pokemon.id !== id
          ),
        }));
      },
      editCustomPokemon: (data: PokemonData) => {
        set((state) => ({
          customPokemons: state.customPokemons.map((pokemon) =>
            pokemon.id === data.id ? { ...data } : pokemon
          ),
        }));
      },
    }),
    {
      name: "customPokemons",
    }
  )
);

export { useCustomPokemon };
