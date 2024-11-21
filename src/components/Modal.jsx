import React from "react";
import { useModal } from "../useContext/ModalContext";

const Modal = ({ title, children }) => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null; // Render nothing if modal is not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">{children}</div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t">
          {/* <button
            onClick={closeModal}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
