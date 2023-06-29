import React from "react";
import { Link as GatsbyLink } from "gatsby";

const Link = ({ to = "", children, ...attrs }) =>
  to.startsWith("http") ? (
    <a href={to} {...attrs}>
      {children}
    </a>
  ) : (
    <GatsbyLink to={to.toLowerCase()} {...attrs}>
      {children}
    </GatsbyLink>
  );
export default Link;
