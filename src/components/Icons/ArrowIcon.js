import React from "react";

const ArrowIcon = ({
  orientation = "down",
  backgroundColor = "",
  arrowColor = "",
}) => {
  const orientationMap = {
    down: "270deg",
    right: "180deg",
    up: "90deg",
    left: "0deg",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-8 w-8 rotate-[${orientationMap[orientation]}] -ml-[0.3rem] scale-75 rounded-full fill-current pt-[0.1rem] pr-[0.2rem]`}
      style={{
        borderColor: backgroundColor ? backgroundColor : "#808080",
        borderWidth: "4px",
        backgroundColor: backgroundColor ? backgroundColor : "#ffffff",
        color: arrowColor ? arrowColor : "#808080",
      }}
    >
      <path d="m17 0 3 3-10 9 10 9-3 3L5 12z" />
    </svg>
  );
};

export default ArrowIcon;
