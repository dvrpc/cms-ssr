import React from "react";

const Modal = ({ isVisible, setIsVisible, AlertText }) => {
  console.log(alert);
  return (
    isVisible && (
      <div
        style={{ zIndex: 1000 }}
        className="fixed top-0 z-100 bg-white p-4 m-6 mt-[30%] flex flex-col rounded-md drop-shadow-lg"
      >
        <div className="flex">
          <div className="my-auto">Alert from DVRPC:</div>
          <button
            className="ml-auto text-2xl"
            onClick={() => setIsVisible(false)}
          >
            &times;
          </button>
        </div>

        <div dangerouslySetInnerHTML={{ __html: AlertText }} />
      </div>
    )
  );
};

export default Modal;
