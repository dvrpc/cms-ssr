import React from "react";
import Link from "./Link";

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
    link: "Livable Communities",
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
      <div key={index} className="md:leading-none">
        <Link
          className="font-bold no-underline hover:underline"
          to={item.href}
          dangerouslySetInnerHTML={{ __html: item.link }}
        />
      </div>
    );
  });
};

const TopNav = ({ menu }) => {
  return (
    <div className="row-span-2 md:ml-8">
      <nav className="ml-auto hidden grid-cols-3 grid-rows-2 justify-end gap-y-1 gap-x-4 text-[color:var(--color-default)] md:grid lg:gap-y-3 xl:flex xl:grid-cols-9">
        <RootNav data={rootNavArr} />
      </nav>
      <div className="p-8 text-right text-[color:var(--color-default)] md:hidden">
        <details className="group">
          <summary className="cursor-pointer list-none text-3xl font-bold leading-none [&::marker]:hidden">
            <span className="block group-open:hidden">☰</span>
            <span className="hidden group-open:block">✖</span>
          </summary>
          <div className="absolute top-[calc(4rem+70.5px)] right-0 left-0 z-30 h-0 overflow-auto bg-gray-50 p-8 pt-0 text-left text-xl font-normal leading-10 transition-[height] duration-300 ease-out group-open:h-[calc(100vh-4rem-70.5px)]">
            <RootNav data={rootNavArr} />
          </div>
        </details>
      </div>
    </div>
  );
};

export default TopNav;
