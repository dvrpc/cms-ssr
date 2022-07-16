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
    link: "Communities",
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
          className="border-b no-underline hover:border-b-[color:var(--color-default)]"
          to={item.href}
          dangerouslySetInnerHTML={{ __html: item.link }}
        />
      </div>
    );
  });
};

const TopNav = ({ menu }) => {
  return (
    <nav className="hidden flex-wrap items-end justify-end gap-4 pb-8 font-medium text-[color:var(--color-default)] md:px-4 lg:flex">
      <RootNav data={rootNavArr} />
    </nav>
  );
};

export default TopNav;
