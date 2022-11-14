import {
  POKEMON_SPRITE_URL,
  MAX_DEX_ID,
  ITEMS_PER_PAGE,
  POKE_API,
  POKE_SPECIES_API,
} from "./config";
import { PokemonInfoTypes, PokemonSpeciesTypes } from "./types";

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

const getPaginationUrl = <T>(page: T) => {
  if (!page) return POKE_SPECIES_API;
  let limit = ITEMS_PER_PAGE;
  const offset = (Number(page) - 1) * ITEMS_PER_PAGE;
  const maxPage = Math.ceil(MAX_DEX_ID / ITEMS_PER_PAGE);
  if (page >= maxPage) {
    limit = MAX_DEX_ID - offset;
  }
  return `${POKE_SPECIES_API}?offset=${offset}&limit=${limit}`;
};

const getPokemonDescription = (
  flavorText: PokemonSpeciesTypes["flavor_text_entries"]
) => {
  let description = "";
  flavorText.some((flavor) => {
    if (flavor.language.name === "en") {
      description = flavor.flavor_text;
    }
  });
  return description;
};

const convertBytesToKilobytes = (bytes: number) => (bytes / 1000).toFixed(2);

const cleanUpPokemonAbility = (ability: string) =>
  ability.toLocaleLowerCase().split("-").join(" ");

const getBase64 = (file: File): Promise<string | ArrayBuffer> => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL;
    // Make new FileReader
    let reader = new FileReader();

    reader.readAsDataURL(file);
    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      // console.log("Called", reader);
      baseURL = reader.result;
      // console.log(baseURL);
      resolve(baseURL || "");
    };
  });
};

export {
  range,
  getBase64,
  getPokemonSpriteUrl,
  convertDecimeterToCentimeter,
  convertHectogramstoKilograms,
  prettifyIndex,
  getPaginationUrl,
  getPokemonDescription,
  cleanUpPokemonAbility,
  convertBytesToKilobytes,
};
