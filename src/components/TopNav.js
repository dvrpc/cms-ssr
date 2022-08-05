import React from "react";
import { Link } from "gatsby";

const rootNavArr = [
  {
    link: "About",
    href: "/About/",
  },
  {
    link: "Connections 2050",
    href: "/Plan/",
  },
  {
    link: "Data",
    href: "/DataProducts/",
  },
  {
    link: "TIP",
    href: "/LongRangePlanAndTIP/",
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
    link: "Planning",
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
      <div key={index} className="text-center md:leading-none">
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
    <nav className="hidden flex-wrap items-end justify-end gap-3 divide-x divide-[#0078ae] pb-7 font-medium text-[color:var(--color-default)] md:px-4 lg:flex">
      <RootNav data={rootNavArr} />
    </nav>
  );
};

export default TopNav;
