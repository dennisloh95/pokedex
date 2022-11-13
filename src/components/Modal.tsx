import React, { ReactElement, useEffect, useLayoutEffect } from "react";
import ReactPortal from "./ReactPortal";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({
  children,
  isOpen,
  title,
  handleClose,
}: {
  children: ReactElement | string;
  isOpen: boolean;
  title?: string;
  handleClose: () => void;
}) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal portalId="modal-container">
      <div className="modal overflow-y-auto overflow-x-hidden fixed inset-0 z-50 h-full w-full">
        <div
          className="fixed h-full w-full bg-gray-800/25"
          onClick={handleClose}
        />
        <div className="relative p-4 w-full max-w-3xl h-full md:h-auto z-10 m-auto">
          <div className="relative bg-white rounded-lg shadow overflow-hidden">
            <div className="flex justify-between items-start p-4 border-b">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-700"
              >
                <AiOutlineClose size={26} />
              </button>
            </div>

            <div className="modal-content p-3">{children}</div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default Modal;
