import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { POKE_API } from "../utils/config";
import {
  convertDecimeterToCentimeter,
  convertHectogramstoKilograms,
} from "../utils/functions";

const Pokemon = () => {
  let { pokemonIndex } = useParams();
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    let finalData: any = {};
    fetch(`${POKE_API}${pokemonIndex}`).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        console.log(data);

        finalData["height"] = convertDecimeterToCentimeter(data.height);
        finalData["weight"] = convertHectogramstoKilograms(data.weight);

        console.log({ finalData });
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
