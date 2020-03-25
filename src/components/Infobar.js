import React from "react";
import { css } from "styled-components/macro";
import tw from "twin.macro";
import color from "color";

const Infobar = () => {
  return (
    <aside
      css={css`
        ${tw`flex justify-center text-gray-900-75`}
        background-color: ${(props) => props.theme.bgPrimary};
      `}
    >
      <div
        css={css`
          ${tw`flex justify-center justify-between mx-4`}
          width: 120ch;
        `}
      >
        {["Announcements", "Products", "Events", "Twitter"].map((text) => (
          <h2
            css={`${tw`no-underline flex-auto font-bold text-xl leading-none rounded-lg rounded-b-none pt-4 pl-4 pb-2 mt-2 mr-8 mb-0`} background-color: ${(
              props
            ) => color(props.theme.bgPrimary).lighten(0.15).string()}`}
            key={text}
          >
            {text}
          </h2>
        ))}
      </div>
    </aside>
  );
};

export default Infobar;
