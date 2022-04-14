import React from "react";
import Icon, { Dvrpc } from "./Icon";
import Hamburger from "../components/Hamburger";
import MobileNav from "./MobileNav";

const MobileHeader = ({ children }) => {
  return (
    <div className="md:hidden">
      <div className="fixed z-50" style={{ height: "6rem" }}>
        <div className="w-screen h-full top-0 logo-bar container md:px-8 mx-auto flex sm:justify-between bg-dvrpcBlue text-white z-50">
          <div className="flex items-center ml-8">
            <Hamburger />
          </div>
          <a href="/" className="block self-center ml-auto">
            <Icon use={Dvrpc} scale={null} className="m-8 md:ml-0 h-[60px]" />
          </a>
        </div>
      </div>
      <MobileNav />
      <div
        className="pt-16 w-full bg-bottom h-[var(--height-banner)] bg-cover relative after:absolute after:block after:bottom-4 after:right-0 after:p-1 after:px-2 after:pl-64 after:text-gray-900 after:text-sm after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-white/80 after:content-[var(--content-photo-credits)]"
        style={{
          backgroundImage: "var(--bg-cover-image)",
        }}
      >
        <div className="container px-6 py-24 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default MobileHeader;
