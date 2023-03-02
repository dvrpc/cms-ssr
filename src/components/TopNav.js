import React from "react";
import { Link } from "gatsby";

const rootNavArr = [
  {
    link: "About",
    href: "/About/",
  },
  {
    link: "Data Center",
    href: "/Data/",
  },
  {
    link: "Long Range Plan",
    href: "/Plan/",
  },
  {
    link: "TIP",
    href: "/TIP/",
  },
  {
    link: "Transportation",
    href: "/Transportation/",
  },
  {
    link: "Land Uses",
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

const RootNav = ({ data }) => {
  return data.map((item, index) => {
    return (
      <div key={index} className="shrink-0 text-center md:leading-none">
        <Link
          className="pl-3 font-bold no-underline hover:underline"
          to={item.href}
          dangerouslySetInnerHTML={{ __html: item.link }}
        />
      </div>
    );
  });
};

const TopNav = ({ menu }) => {
  return (
    <div className="mb-7 self-end overflow-x-auto overflow-y-hidden md:ml-4 lg:ml-auto">
      <nav className="ml-auto hidden gap-3 divide-x divide-[#0078ae] font-medium text-[color:var(--color-default)] md:flex">
        <RootNav data={rootNavArr} />
      </nav>
    </div>
  );
};

export default TopNav;
