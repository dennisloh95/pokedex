import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { pokemonApi } from "../utils/config";

const Pokemon = () => {
  let { pokemonIndex } = useParams();

  useEffect(() => {
    fetch(`${pokemonApi}${pokemonIndex}`).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        console.log(data.name);
      }
    });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1>This is Pokemon! {pokemonIndex}</h1>
    </div>
  );
};

export default Pokemon;
