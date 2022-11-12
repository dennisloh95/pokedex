import { Link } from "react-router-dom";
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
          <div>#{index}</div>
        </div>
        <img src={imageUrl} alt={name} />
      </div>
    </Link>
  );
};

export default PokemonCard;
