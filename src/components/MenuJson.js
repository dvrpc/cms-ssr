import React from "react";
import tw, { css } from "twin.macro";

const rootNavArr = [
  {
    link: "About",
    href: "/About/",
  },
  {
    link: "Open Data",
    href: "/DataProducts/",
  },
  {
    link: "Long-Range Plan &amp; TIP",
    href: "/LongRangePlanAndTIP/",
  },
  {
    link: "Transportation",
    href: "/Transportation/",
  },
  {
    link: "Land Use &amp; Environment",
    href: "/LandUseEnvironment/",
  },
  {
    link: "Planning Assistance",
    href: "/Planning/",
  },
  {
    link: "Commuters",
    href: "/CommuterServices/",
  },
  {
    link: "Get Involved",
    href: "/GetInvolved/",
  },
];

const getAncestor = (node) => (node.parent ? getAncestor(node.parent) : node);

const RootNav = ({ data = null }) => {
  if (data === null) {
    data = { href: "" };
  }
  const ancestor = getAncestor(data);

  return rootNavArr.map((link) => (
    <div key={link.href} tw="text-center px-2 leading-none flex-auto">
      <a
        css={[tw`no-underline`, link.href === ancestor.href && tw`font-bold`]}
        href={link.href}
        dangerouslySetInnerHTML={{ __html: link.link }}
      ></a>
    </div>
  ));
};

export { RootNav };

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
      <ul tw="h-full text-right mb-12">
        {nodes.map((node) => (
          <li key={node.href}>
            <a
              css={[
                tw`underline block py-1`,
                node.href === data.href && tw`font-bold`,
              ]}
              href={node.href}
              dangerouslySetInnerHTML={{ __html: node.link }}
            ></a>
          </li>
        ))}
      </ul>
    </nav>
  ) : null;
};
