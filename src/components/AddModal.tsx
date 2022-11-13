import Form from "./Form";
import Modal from "./Modal";

const AddModal = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} title="Add Pokémon" handleClose={handleClose}>
      <Form onSuccess={handleClose} />
    </Modal>
  );
};

export default AddModal;
