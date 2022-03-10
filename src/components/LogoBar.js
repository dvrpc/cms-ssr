import React from "react";
import tw, { css } from "twin.macro";
import I from "./Icon";
import SocialMedia from "./SocialMedia";

const LogoBar = ({ fillColor = "#0078ae", children }) => (
  <div tw="container md:h-32 md:px-8 xl:p-0 mx-auto flex flex-wrap items-end justify-center sm:justify-between">
    <a href="/" tw="block self-center">
      <I
        use="dvrpc"
        tw="h-12 m-4 md:ml-0"
        css={css`
          height: 70.5px;
        `}
      />
    </a>
    {children}
    <div tw="flex flex-col justify-end md:items-end m-4">
      <SocialMedia fillColor={fillColor} />
    </div>
  </div>
);

export default LogoBar;
