import React from "react";
import Icon, { DvrpcMini, DvrpcWhite, Search } from "./Icon";
import Hamburger from "../components/Hamburger";
import { isSSR } from "../pages/index";

const MobileHeader = ({ alert, children, isIndex }) => {
  const changeColor = (event) => {
    if (isSSR) {
      return;
    }
    const color = event.target.parentElement.style.backgroundColor;
    event.target.parentElement.style.backgroundColor = !color
      ? "var(--color-h1)"
      : "";
    const logo = document.getElementById("mobile-logo").style.display;
    document.getElementById("mobile-logo").style.display = !logo ? "none" : "";
  };

  return (
    <div className="md:hidden">
      <div className="w-screen fixed z-50" style={{ height: "6rem" }}>
        <div
          className="h-full top-0 md:px-8 flex text-white z-50"
          style={{ backgroundColor: "var(--color-h1)" }}
        >
          <div className="flex items-center ml-8">
            <Hamburger />
          </div>
          {!isIndex && (
            <form
              className="flex items-center w-full"
              action="https://www.dvrpc.org/Search/"
            >
              <div className="absolute w-5/6 pr-4 pl-4">
                <div className="w-12 h-full flex absolute items-center justify-center pointer-events-none">
                  <Icon
                    use={Search}
                    className="h-6 inline-block flex-shrink-0 select-none text-gray-600 z-10"
                  />
                </div>
                <input
                  name="q"
                  placeholder="Search..."
                  aria-label="Search"
                  className="w-11 focus:w-full rounded-full border-0 border-none focus:m-0 focus:p-2 focus:pl-16 focus:outline-none placeholder-transparent focus:placeholder-gray-600 opacity-90"
                  onBlur={changeColor}
                  onFocus={changeColor}
                />
              </div>
            </form>
          )}
          <a id="mobile-logo" href="/" className="block self-center ml-auto">
            {
              <Icon
                use={isIndex ? DvrpcWhite : DvrpcMini}
                scale={null}
                className="m-8 md:ml-0"
                style={{ height: isIndex ? "50px" : "35px" }}
              />
            }
          </a>
        </div>
      </div>
      <div
        className="pt-24 w-full bg-bottom object-none object-top h-[var(--height-banner)/2] bg-cover relative after:absolute after:block after:bottom-4 after:right-0 after:p-1 after:px-2 after:pl-64 after:text-gray-900 after:text-sm after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-white/80 after:content-[var(--content-photo-credits)]"
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
