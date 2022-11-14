import { renderHook, act } from "@testing-library/react-hooks";
import { usePokemonListing, usePokemonInfo } from "../utils/hooks";

describe("Custom Hook test", () => {
  test("pokemon data as array", () => {
    const {
      result: {
        current: { pokemons },
      },
    } = renderHook(() => usePokemonListing());
    expect(Array.isArray(pokemons)).toBe(true);
  });

  test("should return error if api error", () => {
    const { result } = renderHook(() => usePokemonListing("-1"));
    try {
      result;
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toThrow(TypeError);
    }
  });
});
