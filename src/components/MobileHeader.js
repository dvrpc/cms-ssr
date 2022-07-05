import React, { useState } from "react";
import Icon, { DvrpcMini, DvrpcWhite, Search } from "./Icon";
import Hamburger from "../components/Hamburger";
import { isSSR } from "../pages/index";
import Modal from "./Modal";

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
  const [isVisible, setIsVisible] = useState(false);

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
          {!isIndex ? (
            <form
              className="flex items-center w-full"
              action="https://www.dvrpc.org/Search/"
            >
              <div className="absolute w-5/6 pr-4 pl-4">
                <div
                  className="w-12 h-full flex absolute items-center justify-center pointer-events-none"
                  style={{ color: "var(--color-h1)" }}
                >
                  <Icon
                    use={Search}
                    className="h-6 inline-block flex-shrink-0 select-none z-10"
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
          ) : (
            <button
              className="h-12 w-12 font-bold rounded-full bg-[#c81e1d] flex justify-center items-center text-xs ring-white/50 ring-2 my-auto ml-6"
              onClick={() => setIsVisible(true)}
            >
              ALERT
            </button>
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
        className="pt-24 w-full bg-center object-none object-top h-[var(--height-banner)/2] bg-cover translate-y-8 bg-no-repeat relative after:absolute after:block after:bottom-4 after:right-0 after:p-1 after:px-2 after:pl-64 after:text-gray-900 after:text-sm after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-white/80 after:content-[var(--content-photo-credits)]"
        style={{
          backgroundImage: "var(--bg-cover-image)",
          backgroundSize: !isIndex ? "175%" : "",
        }}
      >
        <div className="container px-6 py-20 mx-auto">
          {isIndex && (
            <form
              className="relative md:w-min md:pr-32 py-4"
              action="https://www.dvrpc.org/Search/"
            >
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
            </form>
          )}
          {children}
        </div>
      </div>
      <Modal
        isVisible={isVisible}
        AlertText={alert}
        setIsVisible={setIsVisible}
      />
    </div>
  );
};

export default MobileHeader;
