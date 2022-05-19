import React from "react";
import rootNavArr from "../utils/rootNavArr";
import { Link } from "gatsby";
import Icon, { Search } from "./Icon";
import { isSSR } from "../pages/index";

const MobileNav = ({ additionalLinks, isIndex }) => {
  return (
    <div
      className="text-white border-t xnav"
      style={{ backgroundColor: "var(--color-h1)", top: "6rem" }}
    >
      <div className="xnav-wrapper px-4 py-8">
        {!isSSR && additionalLinks && (
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
