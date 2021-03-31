import React, { useContext } from "react";
import tw, { css } from "twin.macro";
import { ThemeContext } from "styled-components";
import LogoBar from "./LogoBar";

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
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
                tw="w-8 h-8 inline-block fill-current text-gray-600 flex-shrink-0 select-none"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>
            </div>
            <div tw="">
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
