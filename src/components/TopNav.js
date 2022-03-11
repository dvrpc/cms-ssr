import React from "react";
import tw, { css } from "twin.macro";
import { RootNav } from "./MenuJson";
import Color from "color";

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
        css={(props) => css`
          & > * {
            border-color: ${Color(props.infoColor).alpha(.25).toString()};
          }
        `}
      >
        <RootNav data={menu} />
      </div>
    </nav>
  );
};

export default TopNav;
