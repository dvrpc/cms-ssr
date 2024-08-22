import React from "react";

/**
 * @summary Centers SVG icon in circle. Effort to maintain more consistent UI.
 * Pass SVG as child component. Must not have height or width set. Set instead through component props.
 */
const CenteredIcon = ({
  backgroundColor = "",
  strokeColor = "",
  height,
  children,
}) => {
  return (
    <div
      style={{
        height: height,
        width: height,
      }}
    >
      <svg viewBox="0 0 60 62" width="100%" height="100%">
        <circle
          cx="50%"
          cy="50%"
          r="35%"
          fill={backgroundColor || "#ffffff"}
          strokeWidth="3"
          stroke={!backgroundColor && "#646464"}
        ></circle>
        {children}
      </svg>
    </div>
  );
};

export default CenteredIcon;
