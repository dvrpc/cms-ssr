import React from "react";
import PropTypes from "prop-types";

const Nav = ({ data = [] }) => (
  <nav className="mt-8 nested-list-reset">
    <ul className="m-0 flex flex-col w-full justify-around">{nest(data)}</ul>
  </nav>
);

const nest = (data) =>
  data.map((i) => (
    <li
      className="p-2 pl-4 border border-solid font-bold"
      css={{
        background: "linear-gradient(to right,#eee0d2 0,#f4f4f4 65%)",
        borderColor: "#eee0d2",
        marginBottom: "-1px",
      }}
      key={i.url.path}
    >
      <a href={i.url.path}>{i.label}</a>
      {i.links && i.links.length ? (
        <ul className="m-0 flex flex-col w-full justify-around">
          {nest(i.links)}
        </ul>
      ) : (
        ""
      )}
    </li>
  ));

Nav.propTypes = {
  data: PropTypes.array,
};

export default Nav;
