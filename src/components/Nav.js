import React from "react";
import PropTypes from "prop-types";
import { css } from "styled-components/macro";
import tw from "twin.macro";

const Nav = ({ data = [] }) => (
  <nav css={tw`m-0 p-0 list-none mt-8`}>
    <ul css={tw`m-0 p-0 flex flex-col w-full justify-around list-none`}>
      {nest(data)}
    </ul>
  </nav>
);

const nest = data =>
  data.map(i => (
    <li
      css={css`
        ${tw`p-2 pl-4 border border-solid font-bold`}
        border-color: rgba(0, 0, 0, 0.7);
      `}
      key={i.url.path}
    >
      <a href={i.url.path} dangerouslySetInnerHTML={{ __html: i.label }}></a>
      {i.links && i.links.length ? (
        <ul css={tw`m-0 p-0 flex flex-col w-full justify-around list-none`}>
          {nest(i.links)}
        </ul>
      ) : (
        ""
      )}
    </li>
  )) || null;

Nav.propTypes = {
  data: PropTypes.array,
  css: PropTypes.any
};

export default Nav;
