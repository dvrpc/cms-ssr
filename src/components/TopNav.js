import React from "react";
import { Link } from "gatsby";

const rootNavArr = [
  {
    link: "About",
    href: "/About/",
  },
  {
    link: "Data &amp; Products",
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

const RootNav = ({ data }) => {
  return data.map((item, index) => {
    return (
      <div key={index} className="text-center px-2 md:leading-none flex-auto">
        <Link
          className="no-underline hover:underline"
          to={item.href}
          dangerouslySetInnerHTML={{ __html: item.link }}
        />
      </div>
    );
  });
};

const TopNav = ({ menu }) => {
  return (
    <nav className="hidden md:flex text-white bg-[color:var(--color-highlight)]">
      <div className="container flex py-4 md:divide-x divide-white/50">
        <RootNav data={rootNavArr} />
      </div>
    </nav>
  );
};

export default TopNav;
