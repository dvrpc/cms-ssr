import React from "react";
import PropTypes from "prop-types";
import tw, { css } from "twin.macro";

const Icon = ({ style, children, ...props }) => {
  const styles = [
    tw`relative inline-block`,
    css`
      top: 1px;
      background: transparent
        url(https://www.dvrpc.org/img/homepage/sprites.svg) no-repeat;
      background-size: 139px 18px;
      text-indent: -9999rem;
      height: 18px;
      width: 18px;
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
