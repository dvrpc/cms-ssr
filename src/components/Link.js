import React from "react";
import { Link as GatsbyLink } from "gatsby";

const Link = ({ to = "", children, ...attrs }) => (
  <GatsbyLink to={to.toLowerCase()} {...attrs}>
    {children}
  </GatsbyLink>
);

export default Link;
