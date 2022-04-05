import React from "react";

const A = ({ href, label, children }) => {
  return (
    <a
      className="block"
      href={href}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default A;
