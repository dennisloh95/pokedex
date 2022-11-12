import { POKEMON_SPRITE_URL, MAX_DEX_ID } from "./config";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const getPokemonSpriteUrl = (index: string) => {
  return `${POKEMON_SPRITE_URL}/${index}.png`;
};

const convertDecimeterToCentimeter = (dc: number) => {
  return dc * 10;
};

const convertHectogramstoKilograms = (hg: number) => {
  return hg / 10;
};

const prettifyIndex = (index: string) => {
  const requiredLength = MAX_DEX_ID.toString().split("").length;
  return index.padStart(requiredLength, "0");
};

export {
  range,
  getPokemonSpriteUrl,
  convertDecimeterToCentimeter,
  convertHectogramstoKilograms,
  prettifyIndex,
};
