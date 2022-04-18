import React from "react";
import { rootNavArr } from "../utils/rootNavArr";
import { Link } from "gatsby";
import Icon, { Search } from "./Icon";
import isBrowser from "../pages/index";

const MobileNav = ({ additionalLinks, isIndex }) => {
  console.log(additionalLinks);
  return (
    <div
      className="text-white border-t xnav"
      style={{ backgroundColor: "var(--color-h1)" }}
    >
      <div className="xnav-wrapper px-4">
        <form
          className="relative md:w-min md:pr-32 py-4"
          action="https://www.dvrpc.org/Search/"
        >
          {isIndex && (
            <div>
              <div className="w-16 pt-1 h-1/2 flex absolute items-center justify-center pointer-events-none">
                <Icon
                  use={Search}
                  className="h-6 inline-block flex-shrink-0 select-none text-gray-600 z-10"
                />
              </div>
              <input
                name="q"
                placeholder="Search..."
                aria-label="Search"
                className="border-0 border-none m-0 p-2 pl-16 focus:outline-none placeholder-gray-600 opacity-90"
              />
            </div>
          )}
        </form>
        {additionalLinks && (
          <div className="border-b">
            <Link
              className="no-underline hover:underline my-12 text-3xl"
              to={additionalLinks.href}
            >
              {additionalLinks.link}
            </Link>
            {additionalLinks.links.map((item, index) => {
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
        )}
        {rootNavArr.map((item, index) => {
          return (
            <div key={index} className="py-4 flex-auto text-3xl">
              <Link
                className="no-underline hover:underline my-12"
                to={item.href}
                dangerouslySetInnerHTML={{ __html: item.link }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MobileNav;
