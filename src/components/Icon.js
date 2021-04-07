import React from "react";
import PropTypes from "prop-types";
import tw, { css } from "twin.macro";
import sprites from "../images/new.svg";

const Icon = ({ style, children, ...props }) => {
  const styles = [
    tw`relative inline-block`,
    css`
      top: 1px;
      background: transparent url(${sprites}) no-repeat;
      background-size: 343px 36px;
      text-indent: -9999rem;
      height: 24px;
      width: 24px;
    `,
    style,
  ];
  return (
    <i {...props} css={styles}>
      {children}
    </i>
  );
};

Icon.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};

export default Icon;
