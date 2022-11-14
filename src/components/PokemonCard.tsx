import { Link } from "react-router-dom";
import { prettifyIndex } from "../utils/helpers";
import { PokemonCardType } from "../utils/types";
import { TbEdit, TbTrash } from "react-icons/tb";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
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
        <div className="relative bg-white shadow-xl rounded-lg p-5 h-full overflow-hidden">
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
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/no-img-found.png";
            }}
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

export const PokemonCardSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="relative bg-white shadow-xl rounded-lg p-5 h-full">
        <div className="flex-1 flex justify-between">
          <div className="h-3 bg-gray-200 rounded-full w-[80px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full w-[30px] mb-2.5"></div>
        </div>
        <div className="flex justify-center items-center w-full h-[80px] sm:max-w-[80px] mx-auto sm:mx-0 bg-gray-300 rounded ">
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
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default PokemonCard;
