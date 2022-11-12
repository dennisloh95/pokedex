import { Link } from "react-router-dom";
import { prettifyIndex } from "../utils/functions";
import { PokemonCardType } from "../utils/types";

interface IProps {
  data: PokemonCardType;
}

const PokemonCard = ({ data: { name, index, imageUrl } }: IProps) => {
  return (
    <Link to={`/pokemon/${index}`}>
      <div className="relative bg-white shadow-xl rounded-lg p-5 ">
        <div className="flex justify-between">
          <div className="capitalize font-bold">{name}</div>
          <div>#{prettifyIndex(index)}</div>
        </div>
        <img
          className="object-cover w-[80px] h-[80px]"
          src={imageUrl}
          alt={name}
          width="80"
          height="80"
        />
      </div>
    </Link>
  );
};

export default PokemonCard;
