import { memo } from "react";
import { useCustomPokemon } from "../store";
import Modal from "./Modal";

const DeleteModal = ({
  id,
  targetId,
  handleClose,
}: {
  id: string;
  targetId: string;
  handleClose: () => void;
}) => {
  const deleteCustomPokemon = useCustomPokemon(
    (state) => state.deleteCustomPokemon
  );

  const handleDelete = () => {
    deleteCustomPokemon(id);
    handleClose();
  };

  return (
    <Modal
      title="Delete Pokémon"
      isOpen={targetId === id}
      handleClose={handleClose}
    >
      <>
        <div className="mb-3">
          Are you sure you want to delete this pokemon?
        </div>
        <button
          onClick={handleDelete}
          type="button"
          className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
        >
          Yes, I'm sure
        </button>
        <button
          onClick={handleClose}
          type="button"
          className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
        >
          No, cancel
        </button>
      </>
    </Modal>
  );
};

export default memo(DeleteModal);
