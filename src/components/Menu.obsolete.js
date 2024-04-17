import React from "react";
import Link from "./Link";

export default ({ data = null }) => {
  if (data === null) {
    data = { href: "", links: null };
  }

  let nodes = [];
  const parents = new Set();

  if (data.parent) {
    nodes = data.parent.links;
    parents.add(data.parent);
  }
  if (data.links) {
    nodes = data.links;
    parents.add(data);
  }

  return nodes.length ? (
    <nav className="max-w-sm xl:min-w-[20rem] 2xl:min-w-[24rem]">
      <ul className="flex h-full list-none flex-col sm:mb-12 sm:text-center md:text-right">
        {[...parents].map((parent) => (
          <li
            className="relative mb-1 border border-gray-300 bg-gray-200 py-0.5 px-2 font-bold no-underline after:absolute after:left-full after:-my-1 after:h-0 after:w-0 after:border-[1rem] after:border-r-transparent after:border-t-transparent after:border-b-transparent hover:underline"
            key={parent.href}
          >
            <Link
              to={parent.href}
              dangerouslySetInnerHTML={{ __html: parent.link }}
            ></Link>
          </li>
        ))}
        {nodes.map((node) => (
          <li key={node.href}>
            <Link
              className={`block border-b bg-gray-100 px-2 py-1 no-underline hover:underline ${
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
