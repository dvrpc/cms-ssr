import React from "react";
import { Link } from "gatsby";

export default ({ data = null }) => {
  if (data === null) {
    data = { href: "", links: null };
  }

  let nodes = data.parent ? data.parent.links : [];
  if (data.links) {
    nodes = data.links;
  }

  return nodes.length ? (
    <nav>
      <ul className="h-full list-none md:text-right sm:text-center mb-12">
        {nodes.map((node) => (
          <li key={node.href}>
            <Link
              className={`underline block py-1 ${
                node.href.toLowerCase() === data.href.toLowerCase() &&
                "font-bold"
              }`}
              to={node.href}
              dangerouslySetInnerHTML={{ __html: node.link }}
            ></Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : null;
};
