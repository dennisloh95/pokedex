import React from "react";
import { Link } from "react-router-dom";
import { CONTAINER_STYLE } from "../utils/config";
import { TbPokeball, TbPlus } from "react-icons/tb";

const Header = () => {
  return (
    <div className={`${CONTAINER_STYLE} py-4`}>
      <div className="flex justify-between items-end ">
        <Link to="/">
          <h1 className="text-3xl font-bold">Pokédex</h1>
        </Link>
        <Link to="/">
          <div className="rounded-md py-1 px-2 bg-blue-500 text-white font-bold  flex items-center">
            <TbPlus className="text-xl" />{" "}
            <TbPokeball className="ml-1 text-3xl" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
