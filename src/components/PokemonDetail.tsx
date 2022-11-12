import React from "react";
import { PokemonData } from "../utils/types";
import { GiWeight, GiBodyHeight } from "react-icons/gi";
import { TbPokeball } from "react-icons/tb";
import {
  convertDecimeterToCentimeter,
  convertHectogramstoKilograms,
  prettifyIndex,
} from "../utils/functions";
import { TYPE_COLORS } from "../utils/config";

const PokemonDetail = ({
  name,
  id,
  abilities,
  types,
  isLegendary,
  description,
  height,
  weight,
  imageUrl,
}: PokemonData) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex gap-3 flex-col sm:flex-row">
        <img
          className="object-cover w-[200px] h-[200px] mx-auto sm:mx-0"
          src={imageUrl}
          alt={name}
          width="200"
          height="200"
        />
        <div>
          <p className="text-gray-500 font-bold">
            #{prettifyIndex(id.toString())}
          </p>
          <p className="capitalize text-3xl font-bold mb-1">{name}</p>
          <div className="flex gap-1">
            {types.map(({ name }) => (
              <p
                key={name}
                className="text-white text-xs uppercase py-1 px-2 rounded-md text-center font-bold"
                style={{ backgroundColor: `#${TYPE_COLORS[name]}` }}
              >
                {name}
              </p>
            ))}
          </div>
          <div className="flex my-3">
            <div className="p-3 ">
              <div className="flex items-center text-gray-500">
                <GiWeight />
                <p className="uppercase ml-1 text-xs font-bold">Weight</p>
              </div>
              <p className="text-2xl mt-2">
                {convertHectogramstoKilograms(weight)} kg
              </p>
            </div>

            <div className="p-3 ">
              <div className="flex items-center text-gray-500">
                <GiBodyHeight />
                <p className="uppercase ml-1 text-xs font-bold">Height</p>
              </div>
              <p className="text-2xl mt-2">
                {convertDecimeterToCentimeter(height)} cm
              </p>
            </div>

            <div className="p-3 ">
              <div className="flex items-center text-gray-500">
                <TbPokeball />
                <p className="uppercase ml-1 text-xs font-bold">Rarity</p>
              </div>
              <p className="text-2xl mt-2">
                {isLegendary ? "Legendary" : "Normal"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mb-3">{description}</p>

      <div>
        <p className="font-bold text-lg">Abilities:</p>
        {abilities.map(({ name, isHidden }, index) => (
          <p key={name} className="capitalize">
            {name} {isHidden ? "(Hidden)" : null}
          </p>
        ))}
      </div>
    </div>
  );
};

export const PokemonDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4">
      <div role="status" className="">
        <div className="flex gap-3 flex-col sm:flex-row mb-3">
          <div className="flex justify-center items-center w-full h-[200px] sm:max-w-[200px] mx-auto sm:mx-0 bg-gray-300 rounded ">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-3 bg-gray-200 rounded-full max-w-[100px] mb-2.5"></div>
            <div className="h-6 bg-gray-200 rounded-full max-w-[200px] mb-2.5"></div>
            <div className="flex my-3 gap-5">
              <div className="h-12 bg-gray-200 rounded-full w-[100px]"></div>
              <div className="h-12 bg-gray-200 rounded-full w-[100px]"></div>
              <div className="h-12 bg-gray-200 rounded-full w-[100px]"></div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full w-full mb-4"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-full mb-4"></div>
          <div className="h-2.5 bg-gray-200 rounded-full max-w-[60%] mb-4"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default PokemonDetail;
