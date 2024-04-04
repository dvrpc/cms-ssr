import React from "react";
import Link from "./Link";

export default ({ data = null }) => {
  if (data === null) {
    data = { href: "", links: null };
  }

  let nodes = data.parent ? data.parent.links : [];
  let parent = data.parent ?? data;
  if (data.links) {
    nodes = data.links;
    parent = data;
  }

  return nodes.length ? (
    <nav>
      <ul className="h-full list-none sm:mb-12 sm:text-center md:text-right">
        {parent && (
          <li className="relative">
            <Link
              className="inline-block py-1 mr-5 font-bold no-underline hover:underline"
              to={parent.href}
              dangerouslySetInnerHTML={{ __html: parent.link }}
            ></Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="ml-1 inline-block mb-2.5 h-3.5 absolute right-0 bottom-0"
            >
              <path d="M233 407c13 12 33 12 46 0l192-192a32 32 0 0 0-46-46L256 339 87 169a32 32 0 0 0-46 46l192 192z" />
            </svg>
          </li>
        )}
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
