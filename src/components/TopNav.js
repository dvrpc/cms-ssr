import React from "react";
import { Link } from "gatsby";
import { rootNavArr } from "../utils/rootNavArr";

const RootNav = ({ data, isMobile }) => {
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
    <nav className="hidden md:block md:flex text-white bg-[color:var(--color-highlight)]">
      <div className="container flex py-4 md:divide-x divide-white/50">
        <RootNav data={rootNavArr} />
      </div>
    </nav>
  );
};

export default TopNav;
