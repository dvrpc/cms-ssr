import React from "react";
import LogoBar from "./LogoBar";
import Icon, { Search } from "./Icon";

const Header = ({ bgStyles, alert, children }) => {
  return (
    <header className="bg-white">
      <LogoBar />
      <div
        className="w-full bg-bottom h-[var(--height-banner)] bg-cover relative after:absolute after:block after:bottom-4 after:right-0 after:p-1 after:px-2 after:pl-64 after:text-gray-900 after:text-sm after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-white/80 after:content-[var(--content-photo-credits)]"
        style={{
          backgroundImage: "var(--bg-cover-image)",
          ...bgStyles,
        }}
      >
        {alert}
        <div className="container p-8 mx-auto">
          <form
            className="mb-4 relative md:w-min md:pr-32 bg-gradient-to-r from-white/80 via-white/80 to-transparent"
            action="https://www.dvrpc.org/Search/"
          >
            <div className="w-16 h-full flex absolute items-center justify-center pointer-events-none">
              <Icon
                use={Search}
                className="h-6 inline-block flex-shrink-0 select-none text-gray-600"
              />
            </div>
            <div>
              <input
                name="q"
                placeholder="Search..."
                aria-label="Search"
                className="w-72 border-0 border-none m-0 p-2 pl-16 block bg-transparent focus:outline-none min-w-0 placeholder-gray-600"
              />
            </div>
          </form>
          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;
