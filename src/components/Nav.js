import React from "react";
import PropTypes from "prop-types";
import tw from "twin.macro";

const Nav = ({ data = [] }) => (
  <nav tw="m-0 p-0 list-none mt-8">
    <ul tw="m-0 p-0 flex flex-col w-full justify-around list-none">
      {nest(data)}
    </ul>
  </nav>
);

const nest = (data) =>
  data.map((i) => (
    <li
      tw="p-2 pl-4 border border-solid font-bold border-gray-900-75"
      key={i.url.path}
    >
      <a href={i.url.path} dangerouslySetInnerHTML={{ __html: i.label }}></a>
      {i.links && i.links.length ? (
        <ul tw="m-0 p-0 flex flex-col w-full justify-around list-none">
          {nest(i.links)}
        </ul>
      ) : (
        ""
      )}
    </li>
  )) || null;

Nav.propTypes = {
  data: PropTypes.array,
  css: PropTypes.any,
};

export default Nav;
