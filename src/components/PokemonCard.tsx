import { Link } from "react-router-dom";
import { prettifyIndex } from "../utils/functions";
import { PokemonCardType } from "../utils/types";
import { TbEdit, TbTrash } from "react-icons/tb";
import DeleteModal from "./DeleteModal";
import { useCallback, useEffect, useState } from "react";
import EditModal from "./EditModal";

interface IProps {
  data: PokemonCardType;
  isHandling?: (e: boolean) => void;
}

const PokemonCard = ({ data: { name, index, imageUrl, isCustom } }: IProps) => {
  const [onDeleteId, setOnDeleteId] = useState("");
  const [onEditId, setOnEditId] = useState("");

  return (
    <>
      <Link to={`/pokemon/${index}`}>
        <div className="relative bg-white shadow-xl rounded-lg p-5 h-full">
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
          {isCustom && (
            <div className="absolute bottom-2 right-2 gap-2 flex z-10">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOnEditId(index);
                }}
                className="text-white rounded-full w-7 h-7 bg-orange-500 inline-flex items-center justify-center"
              >
                <TbEdit />
                <span className="sr-only">Edit</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setOnDeleteId(index);
                }}
                className="text-white rounded-full w-7 h-7 bg-red-600 inline-flex items-center justify-center"
              >
                <TbTrash />
                <span className="sr-only">Delete</span>
              </button>
            </div>
          )}
        </div>
      </Link>

      <DeleteModal
        id={index}
        targetId={onDeleteId}
        handleClose={() => setOnDeleteId("")}
      />
      <EditModal
        id={index}
        targetId={onEditId}
        handleClose={() => setOnEditId("")}
      />
    </>
  );
};

export default PokemonCard;
