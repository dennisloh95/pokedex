import { useEffect } from "react";
import { useCustomPokemon } from "../store";
import Form from "./Form";
import Modal from "./Modal";

const EditModal = ({
  id,
  targetId,
  handleClose,
}: {
  id: string;
  targetId: string;
  handleClose: () => void;
}) => {
  const getCustomPokemon = useCustomPokemon((state) => state.getCustomPokemon);

  return (
    <Modal
      title="Edit Pokémon"
      isOpen={targetId === id}
      handleClose={handleClose}
    >
      <Form editData={getCustomPokemon(id)} onSuccess={handleClose} />
    </Modal>
  );
};

export default EditModal;
