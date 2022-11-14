import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CONTAINER_STYLE } from "../utils/config";
import { TbPokeball, TbPlus } from "react-icons/tb";
import AddModal from "./AddModal";

const Header = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <div className={`${CONTAINER_STYLE} py-4`}>
        <div className="flex justify-between items-end ">
          <Link to="/">
            <div className="flex items-center">
              <img
                src={"/icon.png"}
                alt="icon"
                className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]"
                width={50}
                height={50}
              />
              <h1 className="text-2xl sm:text-3xl font-bold ml-1">Pokédex</h1>
            </div>
          </Link>
          <button
            onClick={() => setOpenAddModal(true)}
            type="button"
            className="rounded-md py-1 px-2 bg-blue-500 text-white font-bold  flex items-center"
          >
            <TbPlus className="text-xl" />{" "}
            <TbPokeball className="ml-1 text-3xl" />
          </button>
        </div>
        <nav className="bg-gray-100 rounded mt-3">
          <div className="py-3 px-4 mx-auto w-full md:px-6">
            <div className="flex items-center">
              <ul className="flex flex-row mt-0 mr-6 space-x-6 text-sm font-medium">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-300" : ""
                      } hover:underline py-1 px-1.5 rounded`
                    }
                  >
                    Official Dex
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/custom-pokedex"
                    className={({ isActive }) =>
                      `${
                        isActive ? "bg-gray-300" : ""
                      } hover:underline p-1 rounded`
                    }
                  >
                    Custom Dex
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <AddModal
        isOpen={openAddModal}
        handleClose={() => setOpenAddModal(false)}
      />
    </>
  );
};

export default Header;
