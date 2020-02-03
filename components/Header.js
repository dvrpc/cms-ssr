import React from "react";
import { css } from "styled-components/macro";
import tw from "tailwind.macro";

const Header = () => {
  return (
    <header
      css={css`
        ${tw`bg-white`}
        height: 400px;
        background: bottom
          url(https://www.dvrpc.org/img/banner/full/philly1.jpg) no-repeat;
        background-size: cover;
      `}
    >
      <div
        css={css`
          ${tw`flex justify-center pb-4`}
          background: rgba(255, 255, 255, 0.9);
        `}
      >
        <div
          css={css`
            ${tw`mx-4 flex flex-wrap sm:flex-nowrap items-baseline justify-center sm:justify-between`}
            flex-basis: calc(80ch + 330px);
          `}
        >
          <img
            src="https://www.dvrpc.org/img/homepage/dvrpclogo70px.png"
            alt="DVRPC"
            css={tw`m-4 ml-0`}
          />
          <form
            css={tw`sm:w-auto w-full relative sm:ml-16 bg-white rounded`}
            action="https://www.dvrpc.org/Search/"
          >
            <div
              css={css`
                ${tw`h-full flex absolute items-center justify-center`}
                max-width: 4rem;
                pointer-events: none;
              `}
            >
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
                css={css`
                  ${tw`w-8 h-8 inline-block`}
                  fill: #777;
                  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                  user-select: none;
                  flex-shrink: 0;
                `}
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>
            </div>
            <div css={tw`w-full`}>
              <input
                name="q"
                placeholder="Search..."
                aria-label="Search"
                css={css`
                  ${tw`font-sans sm:w-64 w-full border-0 border-none m-0 p-2 pl-16 block bg-transparent`}
                  min-width: 0;
                  box-sizing: content-box;
                  --webkit-tap-highlight-color: transparent;
                  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                `}
              />
            </div>
          </form>
          <div
            css={css`
              width: 174px;
            `}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
