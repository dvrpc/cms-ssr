import React, { useContext } from "react";
import Async from "react-async";
import tw, { css } from "twin.macro";
import { ThemeContext } from "styled-components";
import LogoBar from "./LogoBar";

const Header = ({ children }) => {
  const theme = useContext(ThemeContext);

  return (
    <header tw="bg-white">
      <LogoBar />
      <div
        tw="w-full bg-bottom flex flex-col items-center justify-center p-8"
        css={(props) =>
          css`
            background-image: url(${props.theme.bgImage[1]}),
              url(${props.theme.bgImage[0]});
            background-size: 1600px 400px, cover;
            min-height: 24rem;
          `
        }
      >
        {children}
      </div>
      <div
        tw="absolute right-0 text-black font-bold italic pr-2"
        css={css`
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
            1px 1px 0 #fff;
          margin-top: -1.5rem;
        `}
      >
        {theme.bgCredits}
      </div>
    </header>
  );
};

export default Header;
