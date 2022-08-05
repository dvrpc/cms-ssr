import React from "react";
import LogoBar from "./LogoBar";
import Icon, { Search } from "./Icon";

const Header = ({ bgStyles, alert, children }) => {
  return (
    <header className="bg-white">
      <LogoBar />
      <div
        className="relative h-[var(--height-banner)] w-full bg-cover bg-bottom after:absolute after:bottom-0 after:right-0 after:block after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-white/80 after:p-1 after:px-2 after:pl-64 after:text-sm after:text-gray-900 after:content-[var(--content-photo-credits)]"
        style={{
          backgroundImage: "var(--bg-cover-image)",
          ...bgStyles,
        }}
      >
        {alert}
        <div className="container mx-auto p-8">
          <form
            className="relative mb-4 bg-gradient-to-r from-white/80 via-white/80 to-transparent md:w-min md:pr-32"
            action="https://www.dvrpc.org/Search/"
          >
            <div className="pointer-events-none absolute flex h-full w-16 items-center justify-center">
              <Icon
                use={Search}
                className="inline-block h-6 flex-shrink-0 select-none text-gray-600"
              />
            </div>
            <div>
              <input
                name="q"
                placeholder="Search..."
                aria-label="Search"
                className="m-0 block w-72 min-w-0 border-0 border-none bg-transparent p-2 pl-16 placeholder-gray-600 focus:outline-none"
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
