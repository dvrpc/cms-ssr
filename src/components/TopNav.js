import React from "react";
import tw, { css } from "twin.macro";
import { RootNav } from "./MenuJson";

const TopNav = ({ menu }) => {
  return (
    <nav
      tw="flex justify-center"
      css={(props) => css`
        background-color: ${props.bgPrimary};
        color: ${props.infoColor};
      `}
    >
      <div
        tw="container flex-auto md:flex py-4 divide-x"
        css={css`
          border-color: rgba(255, 255, 255, 0.25);
        `}
      >
        <RootNav data={menu} />
      </div>
    </nav>
  );
};

export default TopNav;
