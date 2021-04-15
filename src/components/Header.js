import React, { useContext } from "react";
import tw, { css } from "twin.macro";
import { ThemeContext } from "styled-components";
import LogoBar from "./LogoBar";
import I from "./Icon";

const Header = ({ children }) => {
  const theme = useContext(ThemeContext);

  return (
    <header tw="bg-white">
      <LogoBar />
      <div
        tw="w-full bg-bottom p-8"
        css={(props) =>
          css`
            background-image: url(${props.theme.bgImage[1]}),
              url(${props.theme.bgImage[0]});
            background-size: 1600px 400px, cover;
            min-height: 24rem;
          `
        }
      >
        <div tw="container mx-auto">
          <form
            tw="mb-4 relative md:w-min-content md:pr-32"
            css={css`
              background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.8),
                rgba(255, 255, 255, 0.8) 18rem,
                transparent 100%
              );
            `}
            action="https://www2.dvrpc.org/Search/"
          >
            <div tw="w-16 h-full flex absolute items-center justify-center pointer-events-none">
              <I
                use="search"
                fillColor="#6d6d6d"
                tw="h-6 inline-block flex-shrink-0 select-none"
              />
            </div>
            <div>
              <input
                name="q"
                placeholder="Search..."
                aria-label="Search"
                tw="w-72 border-0 border-none m-0 p-2 pl-16 block bg-transparent focus:outline-none min-w-0 placeholder-gray-600"
              />
            </div>
          </form>
        </div>
        {children}
      </div>
      {theme.bgCredits && (
        <div
          tw="absolute right-0 p-1 px-2 leading-none text-gray-900 text-sm"
          css={css`
            padding-left: 8rem;
            background: linear-gradient(
              to left,
              rgba(255, 255, 255, 0.5),
              rgba(255, 255, 255, 0.5) 8rem,
              transparent 100%
            );
            margin-top: -2.5rem;
          `}
        >
          {theme.bgCredits}
        </div>
      )}
    </header>
  );
};

export default Header;
