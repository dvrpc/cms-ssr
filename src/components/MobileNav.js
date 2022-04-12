import React from "react";
import { rootNavArr } from "../utils/rootNavArr";
import { Link } from "gatsby";

const MobileNav = ({ additionalLinks }) => {
  return (
    <div
      id="mobile-nav"
      className="absolute bg-dvrpcBlue border-t h-screen hidden w-full text-white z-50"
    >
      {rootNavArr.map((item, index) => {
        return (
          <div key={index} className="pl-4 py-4 flex-auto text-3xl">
            <Link
              className="no-underline hover:underline my-12"
              to={item.href}
              dangerouslySetInnerHTML={{ __html: item.link }}
            />
          </div>
        );
      })}
    </div>
  );
};
export default MobileNav;
