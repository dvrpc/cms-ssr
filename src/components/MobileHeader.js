import React from "react";
import Icon, { Dvrpc, Search } from "./Icon";
import Hamburger from "../components/Hamburger";

const MobileHeader = ({ children }) => {
  return (
    <div className="mobile-header">
      <div className="w-100 logo-bar container md:px-8 mx-auto flex sm:justify-between bg-dvrpcBlue text-white">
        <div className="flex items-center ml-8">
          <Hamburger />
        </div>
        <a href="/" className="block self-center ml-auto">
          <Icon use={Dvrpc} scale={null} className="m-8 md:ml-0 h-[60px]" />
        </a>
      </div>
      <div
        className="w-full bg-bottom h-[var(--height-banner)] bg-cover relative after:absolute after:block after:bottom-4 after:right-0 after:p-1 after:px-2 after:pl-64 after:text-gray-900 after:text-sm after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-white/80 after:content-[var(--content-photo-credits)]"
        style={{
          backgroundImage: "var(--bg-cover-image)",
        }}
      >
        <div className="container px-6 py-24 mx-auto">
          <form
            className="mb-4 relative md:w-min md:pr-32"
            action="https://www.dvrpc.org/Search/"
          >
            <div className="w-16 h-full flex absolute items-center justify-center pointer-events-none">
              <Icon
                use={Search}
                className="h-6 inline-block flex-shrink-0 select-none"
              />
            </div>
            <div className="w-full">
              <input
                name="q"
                placeholder="Search..."
                aria-label="Search"
                className="border-0 border-none m-0 p-2 pl-16 block focus:outline-none min-w-0 placeholder-gray-600 opacity-90"
              />
            </div>
          </form>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
