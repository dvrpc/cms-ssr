import React from "react";
import tw, { css } from "twin.macro";
import twColor from "@tailwindcss/ui/colors";

const rootParent = {
  links: [
    {
      link: "About",
      href: "/About/",
    },
    {
      link: "Data and Products",
      href: "/DataProducts/",
    },
    {
      link: "Long-Range Plan and TIP",
      href: "/LongRangePlanAndTIP/",
    },
    {
      link: "Transportation",
      href: "/Transportation/",
    },
    {
      link: "Land Use and Environment",
      href: "/LandUseEnvironment/",
    },
    {
      link: "Planning Assistance Center",
      href: "/Planning/",
    },
    {
      link: "Commuter Services",
      href: "/CommuterServices/",
    },
    {
      link: "Get Involved",
      href: "/GetInvolved/",
    },
  ],
};

export default ({ data }) => {
  let root = data;
  if (data === null) {
    root = rootParent;
    data = { href: "" };
  } else {
    if (data.parent) {
      data.parent.links.find((n) => n.href === data.href).links = data.links;
      root = data.parent;

      if (data.parent.parent) {
        data.parent.parent.links.find(
          (n) => n.href === data.parent.href
        ).links = data.parent.links;
        root = data.parent.parent;
      }
    } else {
      rootParent.links.find((n) => n.href === data.href).links = data.links;
      root = rootParent;
    }
  }

  return (
    <nav>
      <ul
        tw="h-full"
        css={(props) => css`
          background: linear-gradient(
            to right,
            ${props.theme.bgNav} 0,
            ${props.theme.bgNav} 0.5rem,
            ${twColor.gray[100]} 0.5rem
          );
        `}
      >
        {nest(root.links, data, 0)}
      </ul>
    </nav>
  );
};

const nest = (nodes, activeNode, level) => {
  return nodes.map((node) => {
    const isActive = node.href === activeNode.href;
    return (
      <li key={node.href} tw="-mb-px">
        <a
          css={[
            css`
              padding-left: ${1.5 + level}rem;
            `,
            tw`underline block pr-3 py-2`,
            isActive && tw`font-bold`,
          ]}
          href={node.href}
        >
          {node.link}
        </a>
        {node.links && (
          <ul
            css={css`
              background: linear-gradient(
                to right,
                rgba(255, 255, 255, 0.15) 0,
                rgba(255, 255, 255, 0.15) 0.5rem,
                ${twColor.gray[100]} 0.5rem
              );
            `}
            tw="pt-2 pb-3 mt-1"
          >
            {nest(node.links, activeNode, level + 1)}
          </ul>
        )}
      </li>
    );
  });
};
