import React from "react";
import LogoBar from "./LogoBar";
import Icon, { Search } from "./Icon";

const Header = ({ bgStyles, alert, children }) => {
  return (
    <header className="bg-white print:hidden">
      <LogoBar />
      <div
        className="relative h-[var(--height-banner)] w-full bg-cover bg-[center_75%]"
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
            <div className="pointer-events-none absolute flex h-full w-10 items-center justify-center">
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
                className="m-0 block w-72 min-w-0 border-0 border-none bg-transparent p-2 pl-10 placeholder-gray-600 focus:outline-none md:pl-12"
              />
            </div>
          </form>
          {children}
          <div className="absolute bottom-0 right-0 block w-full bg-gradient-to-r from-transparent via-white/80 to-white/80 pr-8 text-right text-sm text-gray-900 before:leading-7 before:content-[var(--content-photo-credits)] md:w-auto md:pl-64"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
