import React from "react";
import PropTypes from "prop-types";
import tw, { css } from "twin.macro";

const A = ({ href, label, children }) => {
  return (
    <a
      tw="block"
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

A.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
};

export default A;
