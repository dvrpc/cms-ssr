import React from "react";
import tw, { GlobalStyles } from "twin.macro";
import { createGlobalStyle } from "styled-components";

const CustomGlobalStyles = createGlobalStyle`
  body {
    ${tw`font-sans bg-white text-gray-900 m-0 leading-normal`}
  }
  a {
    color: inherit;
    text-decoration: underline;
  }
`;

export default function GlobalStylesComponent() {
  return [<GlobalStyles key={0} />, <CustomGlobalStyles key={1} />];
}
