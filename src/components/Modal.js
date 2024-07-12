import React from "react";

const Modal = ({ children, toggleModal }) => {
  return (
    <div>
      <div
        id="modal-background"
        className="fixed inset-0 z-30 hidden bg-black bg-opacity-75 transition-opacity"
      ></div>
      <div
        id="modal"
        className="fixed inset-0 z-40 hidden w-screen overflow-y-auto"
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative w-[75%] transform rounded-md bg-[#EFF0F2] p-4 text-left shadow-xl transition-all sm:my-8">
            <button
              className="absolute -top-3 right-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-[#CBB9E2] bg-[#60368C] pb-[0.1rem] pl-[0.06rem] text-3xl text-white shadow-lg"
              onClick={toggleModal}
            >
              &times;
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
