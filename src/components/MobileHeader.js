import React from "react";
import Icon, { DvrpcMini, DvrpcWhite } from "./Icon";
import Hamburger from "../components/Hamburger";

const MobileHeader = ({ alert, children, isIndex }) => {
  return (
    <div className="md:hidden">
      <div className="fixed z-50" style={{ height: "6rem" }}>
        <div
          className="w-screen h-full top-0 logo-bar container md:px-8 mx-auto flex sm:justify-between text-white z-50"
          style={{ backgroundColor: "var(--color-h1)" }}
        >
          <div className="flex items-center ml-8">
            <Hamburger />
          </div>
          <a href="/" className="block self-center ml-auto">
            {
              <Icon
                use={isIndex ? DvrpcWhite : DvrpcMini}
                scale={null}
                className="m-8 md:ml-0"
                style={{ height: isIndex ? "50px" : "40px" }}
              />
            }
          </a>
        </div>
      </div>
      <div
        className="pt-16 w-full bg-bottom h-[var(--height-banner)] bg-cover relative after:absolute after:block after:bottom-4 after:right-0 after:p-1 after:px-2 after:pl-64 after:text-gray-900 after:text-sm after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-white/80 after:content-[var(--content-photo-credits)]"
        style={{
          backgroundImage: "var(--bg-cover-image)",
        }}
      >
        <div className="container px-6 py-20 mx-auto">
          {alert}
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
