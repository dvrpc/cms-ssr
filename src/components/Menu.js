import React from "react";
import { Link } from "gatsby";

const Menu = () => (
  <ul className="mb-12 h-full text-center md:text-right">
    <li>
      <Link to="/about">About</Link>
    </li>
  </ul>
);

export default Menu;
