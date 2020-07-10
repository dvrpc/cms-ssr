import React from "react";
import tw, { css } from "twin.macro";
import color from "color";
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

// Active Node has
// - Parent Node (opt)
// - Children Nodes (opt)

//1. Render Parent links
//2. Find and bold active node
//3. Render active links

export default ({ data }) => {
  data.parent = data.parent || rootParent;
  return (
    <nav>
      <ul>
        {nest(data.parent, data, [
          tw`-mb-px px-3 py-2`,
          (props) =>
            css`
              background: linear-gradient(
                to right,
                ${props.theme.bgPrimary} 0,
                ${twColor.gray[100]} 65%
              );
              border: 1px solid ${props.theme.bgPrimary};
            `,
        ])}
      </ul>
    </nav>
  );
};

const nest = (parent, activeNode, styles) => {
  return parent?.links?.map((node) => {
    const isActive = activeNode.href === node.href;
    return (
      <li key={node.href} css={[tw`py-1 pl-6`, styles]}>
        <a
          css={[tw`underline block`, isActive && tw`font-bold`]}
          href={node.href}
        >
          {node.link}
        </a>
        {isActive && (
          <ul
            css={[
              (props) =>
                css`
                  background: linear-gradient(
                    to right,
                    ${color(props.theme.bgPrimary).lighten(0.15).string()} 0,
                    ${twColor.gray[100]} 65%
                  );
                `,
              tw`pl-3 pt-2 pb-3 mt-1 -ml-3 -mb-3 `,
            ]}
          >
            {nest(activeNode, activeNode)}
          </ul>
        )}
      </li>
    );
  });
};
