import React from "react";
import PropTypes from "prop-types";

const Nav = ({ data = [] }) => (
  <nav className="mt4 nested-list-reset">
    <ul className="ma0 flex flex-column w-100 justify-around">{nest(data)}</ul>
  </nav>
);

const nest = (data) =>
  data.map((i) => (
    <li
      className="pa2 pl3 ba b"
      css={{
        background: "linear-gradient(to right,#eee0d2 0,#f4f4f4 65%)",
        borderColor: "#eee0d2",
        marginBottom: "-1px",
      }}
      key={i.url.path}
    >
      <a href={i.url.path}>{i.label}</a>
      {i.links && i.links.length ? (
        <ul className="ma0 flex flex-column w-100 justify-around">
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
