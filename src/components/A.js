import React from "react";
import PropTypes from "prop-types";
import tw, { css } from "twin.macro";

const A = ({ href, children }) => {
  return (
    <a
      tw="block"
      href={href}
      onClick={(e) => {
        e.preventDefault();
        window.open(
          href,
          null,
          "toolbar=0, location=0, menubar=0, directories=0, noopener"
        );
      }}
    >
      {children}
    </a>
  );
};

A.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

export default A;
