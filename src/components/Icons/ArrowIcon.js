import React from "react";
import CenteredIcon from "./CenteredIcon";

const ArrowIcon = ({
  orientation = "down",
  backgroundColor = "",
  arrowColor = "",
  height,
}) => {
  const orientationMap = {
    down: "270deg",
    right: "180deg",
    up: "90deg",
    left: "0deg",
  };

  return (
    <div
      style={{
        transform: `rotate(${orientationMap[orientation]})`,
      }}
    >
      <CenteredIcon
        height={height}
        strokeColor={arrowColor}
        backgroundColor={backgroundColor}
      >
        <path
          d="m17 0 3 3-10 9 10 9-3 3L5 12z"
          transform="translate(16, 19.5)"
          fill={arrowColor ? arrowColor : "#646464"}
        />
      </CenteredIcon>
    </div>
  );
};

export default ArrowIcon;
