import React from "react";
import { Link } from "gatsby";

const Menu = () => (
  <ul className="h-full text-center md:text-right mb-12">
    <li>
      <Link to="/about">About</Link>
    </li>
  </ul>
);

export default Menu;
