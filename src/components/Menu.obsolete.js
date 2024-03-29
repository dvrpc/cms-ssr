import React from "react";
import Link from "./Link";

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
      <ul className="h-full list-none sm:mb-12 sm:text-center md:text-right">
        {nodes.map((node) => (
          <li key={node.href}>
            <Link
              className={`block py-1 no-underline hover:underline ${
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
