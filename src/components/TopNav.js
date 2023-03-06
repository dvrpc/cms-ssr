import React, { useState } from "react";
import Icon, { Dvrpc } from "./Icon";
import { Link } from "gatsby";

const rootNavArr = [
  {
    link: "About",
    href: "/About/",
  },
  {
    link: "Data Center",
    href: "/Data/",
  },
  {
    link: "Products",
    href: "/Products/Search",
  },
  {
    link: "TIP",
    href: "/TIP/",
  },
  {
    link: "Transportation",
    href: "/Transportation/",
  },
  {
    link: "Livable Communities",
    href: "/LandUseEnvironment/",
  },
];

const RootNav = ({ data }) => {
  return data.map((item, index) => {
    return (
      <div key={index} className="shrink-0 grow md:leading-none lg:grow-0">
        <Link
          className="pl-3 font-bold no-underline hover:underline"
          to={item.href}
          dangerouslySetInnerHTML={{ __html: item.link }}
        />
      </div>
    );
  });
};
const TopNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 bg-[#0078ae] transition ease transform duration-300`;
  return (
    <div className="col-span-3 flex justify-center self-end overflow-x-hidden overflow-y-hidden sm:mb-7 lg:col-span-1 ">
      <nav className="ml-auto hidden grow gap-3 divide-x divide-[#0078ae] text-center font-medium text-[#0078ae] md:flex lg:grow-0">
        <RootNav data={rootNavArr} />
      </nav>
      <button
        className={`align-center group top-8 right-2 z-50 flex h-12 w-12 flex-col items-center justify-center md:hidden ${
          mobileOpen ? "fixed" : "absolute"
        }`}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <div
          className={`${genericHamburgerLine} ${
            mobileOpen ? "translate-y-3 rotate-45 bg-white" : "bg-[#0078ae]"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            mobileOpen ? "bg-white opacity-0" : "bg-[#0078ae] opacity-100"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            mobileOpen ? "-translate-y-3 -rotate-45 bg-white" : "bg-[#0078ae]"
          }`}
        />
      </button>
      <div className="grid-col-1 grid w-full md:w-auto">
        <div
          id="js-Mobile-Nav"
          className={`ease fixed inset-0 top-0 left-0 z-40 flex h-screen w-full transform bg-[#0078ae] py-3 pt-2 text-base transition duration-300 md:hidden ${
            mobileOpen ? "" : "hidden"
          }`}
        >
          <nav className="grid-col-1 ml-6 mt-6 mb-auto grid items-center gap-5 fill-white text-left text-lg text-white sm:ml-10">
            <svg
              id="dvrpc-mobile"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 178.02 71.93"
              className="mb-3 h-[70.5px] "
            >
              <defs>
                <style>{`#dvrpc-mobile path{fill:#fff}`}</style>
              </defs>
              <path
                class="cls-1"
                d="M23.69,13.22A16.86,16.86,0,0,0,7.24,42.49ZM2.42,34.78l1.41-.9a22.32,22.32,0,0,0,9.43-12.53,28.69,28.69,0,0,0,.91-7.5v-1l.07.07a4.51,4.51,0,0,1,.29.4,9.66,9.66,0,0,1,.58.89,5.68,5.68,0,0,1,.45.93,9.59,9.59,0,0,1,.35,1,14.92,14.92,0,0,1-2.46,13.59,14.83,14.83,0,0,1-3,2.77,14.52,14.52,0,0,1-5.94,2.24A6.21,6.21,0,0,1,2.42,34.78Z"
              />
              <path
                class="cls-1"
                d="M26.36,14.7,9.89,44A16.87,16.87,0,0,0,26.36,14.7Zm-5.89,21a30.61,30.61,0,0,0-1.23,7.84c0,.34,0,.68,0,1l-.06-.07c0-.05-.4-.59-.29-.44a8.37,8.37,0,0,1-.57-1,8.7,8.7,0,0,1-.43-1,9.59,9.59,0,0,1-.32-1c-1.27-4.74-.24-10.51,3.07-14.18a14.47,14.47,0,0,1,3.25-2.8A15,15,0,0,1,30.08,22,6.38,6.38,0,0,1,32.2,22l-1.49.89A23.41,23.41,0,0,0,20.47,35.73Z"
              />
              <path
                class="cls-2"
                d="M67.61,42.28h-7.4V39.46h-.1c-.65,1.08-2.53,3.66-7.77,3.66-7.88,0-13-6.09-13-13.92,0-8.81,6.27-13.82,12.88-13.82a10,10,0,0,1,7.64,3.09V0h7.78Zm-14-6.42a6.49,6.49,0,0,0,6.65-6.7,6.59,6.59,0,0,0-13.17,0A6.38,6.38,0,0,0,53.6,35.86Z"
              />
              <path
                class="cls-2"
                d="M88,42.28H80.55l-9.32-26h8l5,16.21h.1l5-16.21h8.06Z"
              />
              <path
                class="cls-2"
                d="M100.94,16.27h7.31V19h.09c.66-1.26,2-3.65,6.51-3.65V23.2c-3.6.1-6.13.85-6.13,4.78v14.3h-7.78Z"
              />
              <path
                class="cls-2"
                d="M118.93,16.27h7.31v2.86h.15a9.85,9.85,0,0,1,8.1-3.75c9.23,0,12.7,8.1,12.7,14.15,0,7.5-5.25,13.64-12.65,13.64a9.94,9.94,0,0,1-7.83-3.24V58.69h-7.78Zm20.48,13a6.51,6.51,0,1,0-6.51,6.6A6.51,6.51,0,0,0,139.41,29.3Z"
              />
              <path
                class="cls-2"
                d="M177.89,32.39a14,14,0,0,1-27.56-3.19,13.92,13.92,0,0,1,27.51-2.9H170a5.84,5.84,0,0,0-5.63-3.66c-3.7-.19-6.18,2.86-6.18,6.61s2.48,6.61,6.18,6.61A6,6,0,0,0,170,32.39Z"
              />
              <path
                class="cls-3"
                d="M71.73.32h2.89c2.07,0,3.14,1.9,3.14,4.3,0,2.73-1.41,4.3-3.55,4.3H71.73Zm1.47,7.3h1.11c1.16,0,2-.93,2-3s-.83-3-2-3H73.2Z"
              />
              <path
                class="cls-3"
                d="M80.07,8.92V.32h4.42v1.3H81.54V3.79h3V5.1h-3V7.62h3v1.3Z"
              />
              <path class="cls-3" d="M87.09,8.92V.32h1.47v7.3H91.3v1.3Z" />
              <path
                class="cls-3"
                d="M95.29.32h1.3l2.67,8.6H97.75L97,6.64H94.87l-.7,2.28H92.65Zm.64,2.23h0l-.74,2.78h1.51Z"
              />
              <path
                class="cls-3"
                d="M105.5.32l1.43,6.3h0l1.27-6.3h1.54l-2.16,8.6h-1.35l-1.39-6.23h0l-1.41,6.23h-1.36L99.92.32h1.52l1.31,6.3h0l1.38-6.3Z"
              />
              <path
                class="cls-3"
                d="M113.3.32h1.3l2.67,8.6h-1.51l-.71-2.28h-2.16l-.71,2.28h-1.52Zm.64,2.23h0l-.74,2.78h1.51Z"
              />
              <path
                class="cls-3"
                d="M119.13,8.92V.32h2.59A2.54,2.54,0,0,1,124.4,3a2.23,2.23,0,0,1-2,2.45l2.39,3.43h-1.73l-2.44-3.78h0V8.92Zm1.47-4.59h.86c.9,0,1.46-.29,1.46-1.26,0-1.15-.65-1.45-1.56-1.45h-.76Z"
              />
              <path
                class="cls-3"
                d="M126.81,8.92V.32h4.43v1.3h-3V3.79h3V5.1h-3V7.62h3v1.3Z"
              />
              <path
                class="cls-3"
                d="M142.44.32h1.49l-2.51,8.6h-1.37L137.53.32h1.54l1.65,6.27h0Z"
              />
              <path
                class="cls-3"
                d="M147.31.32h1.29l2.68,8.6h-1.51l-.71-2.28h-2.17l-.7,2.28h-1.52ZM148,2.55h0l-.73,2.78h1.51Z"
              />
              <path class="cls-3" d="M153.14,8.92V.32h1.47v7.3h2.74v1.3Z" />
              <path class="cls-3" d="M159.49,8.92V.32H161v7.3h2.74v1.3Z" />
              <path
                class="cls-3"
                d="M165.84,8.92V.32h4.42v1.3h-2.94V3.79h3V5.1h-3V7.62h3v1.3Z"
              />
              <path
                class="cls-3"
                d="M174.3,5.45,172.07.32h1.57l1.41,3.59,1.4-3.59H178l-2.25,5.13V8.92H174.3Z"
              />
              <path
                class="cls-3"
                d="M41.56,71.78V62.91h2.32c2.21,0,3.18,1.21,3.18,2.81a2.57,2.57,0,0,1-2.73,2.76H43.07v3.3Zm1.51-4.65h1.11a1.28,1.28,0,0,0,1.36-1.45,1.26,1.26,0,0,0-1.36-1.42H43.07Z"
              />
              <path class="cls-3" d="M49.12,71.78V62.91h1.51v7.52h2.82v1.35Z" />
              <path
                class="cls-3"
                d="M57.29,62.91h1.33l2.76,8.87H59.82l-.73-2.35H56.86l-.72,2.35H54.57ZM58,65.22h0l-.76,2.86h1.56Z"
              />
              <path
                class="cls-3"
                d="M63.05,71.78V62.91h1.61l2.81,5.75h0V62.91h1.35v8.87H67.52l-3.1-6.22h0v6.22Z"
              />
              <path
                class="cls-3"
                d="M71.35,71.78V62.91H73l2.8,5.75h0V62.91h1.35v8.87H75.82l-3.1-6.22h0v6.22Z"
              />
              <path class="cls-3" d="M79.76,71.78V62.91h1.52v8.87Z" />
              <path
                class="cls-3"
                d="M83.89,71.78V62.91H85.5l2.81,5.75h0V62.91h1.35v8.87H88.36l-3.1-6.22h0v6.22Z"
              />
              <path
                class="cls-3"
                d="M96.66,65.89c-.22-1.26-.76-1.77-1.54-1.77-1.1,0-1.8.93-1.8,3.23s.7,3.23,1.9,3.23,1.53-.83,1.53-2.14H94.56V67.09h3.71v1.16c0,2.21-1,3.68-3.08,3.68s-3.39-1.45-3.39-4.58c0-2.79,1.24-4.58,3.39-4.58a3,3,0,0,1,3,3.12Z"
              />
              <path
                class="cls-3"
                d="M109.2,66.32c-.08-1.54-.54-2.2-1.52-2.2s-1.83.88-1.83,3.23.75,3.23,1.73,3.23,1.4-.46,1.62-2.09h1.51c-.08,2-1.06,3.44-3.08,3.44s-3.3-1.27-3.3-4.58c0-3,1.48-4.58,3.3-4.58,2.13,0,3.1,1.69,3.08,3.55Z"
              />
              <path
                class="cls-3"
                d="M119.2,67.35c0,2.84-1.34,4.58-3.28,4.58s-3.28-1.74-3.28-4.58,1.35-4.58,3.28-4.58S119.2,64.51,119.2,67.35Zm-3.28-3.23c-.94,0-1.76.95-1.76,3.23s.82,3.23,1.76,3.23,1.77-1,1.77-3.23S116.87,64.12,115.92,64.12Z"
              />
              <path
                class="cls-3"
                d="M121.3,62.91h2.13l1.46,6.45h0l1.49-6.45h2.13v8.87h-1.42V64.65h0l-1.69,7.13h-1l-1.69-7.13h0v7.13H121.3Z"
              />
              <path
                class="cls-3"
                d="M131,62.91h2.13l1.46,6.45h0l1.48-6.45h2.13v8.87h-1.42V64.65h0l-1.69,7.13h-1l-1.69-7.13h0v7.13H131Z"
              />
              <path class="cls-3" d="M140.77,71.78V62.91h1.52v8.87Z" />
              <path
                class="cls-3"
                d="M145.8,69c.09.83.36,1.56,1.3,1.56a1.2,1.2,0,0,0,1.23-1.25c0-2.08-3.77-.73-3.77-4.16a2.36,2.36,0,0,1,2.52-2.4c1.63,0,2.42,1.1,2.52,2.62h-1.41c-.08-.68-.44-1.27-1.17-1.27a1,1,0,0,0-1,1.13c0,1.85,3.77.6,3.77,4a2.53,2.53,0,0,1-2.68,2.69A2.64,2.64,0,0,1,144.38,69Z"
              />
              <path
                class="cls-3"
                d="M152.75,69c.09.83.36,1.56,1.3,1.56a1.2,1.2,0,0,0,1.22-1.25c0-2.08-3.77-.73-3.77-4.16a2.36,2.36,0,0,1,2.52-2.4,2.45,2.45,0,0,1,2.53,2.62h-1.41c-.09-.68-.44-1.27-1.18-1.27a1,1,0,0,0-1,1.13c0,1.85,3.77.6,3.77,4A2.52,2.52,0,0,1,154,71.93,2.64,2.64,0,0,1,151.33,69Z"
              />
              <path class="cls-3" d="M158.89,71.78V62.91h1.52v8.87Z" />
              <path
                class="cls-3"
                d="M169.19,67.35c0,2.84-1.35,4.58-3.28,4.58s-3.28-1.74-3.28-4.58,1.34-4.58,3.28-4.58S169.19,64.51,169.19,67.35Zm-3.28-3.23c-.94,0-1.76.95-1.76,3.23s.82,3.23,1.76,3.23,1.76-1,1.76-3.23S166.85,64.12,165.91,64.12Z"
              />
              <path
                class="cls-3"
                d="M171.32,71.78V62.91h1.62l2.81,5.75h0V62.91h1.35v8.87H175.8l-3.1-6.22h0v6.22Z"
              />
              <path
                class="cls-3"
                d="M41.44,58.15V49.28h2.67a2.62,2.62,0,0,1,2.76,2.81,2.29,2.29,0,0,1-2,2.52l2.47,3.54H45.51L43,54.26h0v3.89ZM43,53.42h.88c.93,0,1.51-.3,1.51-1.3,0-1.18-.68-1.49-1.61-1.49H43Z"
              />
              <path
                class="cls-3"
                d="M50.45,58.15V49.28H55v1.35H52v2.23h3.08v1.35H52V56.8h3.11v1.35Z"
              />
              <path
                class="cls-3"
                d="M63.27,52.26c-.22-1.26-.76-1.78-1.54-1.78-1.1,0-1.8.93-1.8,3.24s.7,3.23,1.9,3.23,1.53-.83,1.53-2.14H61.17V53.46h3.71v1.16c0,2.21-1,3.68-3.08,3.68s-3.39-1.45-3.39-4.58c0-2.8,1.24-4.58,3.39-4.58a3,3,0,0,1,3,3.12Z"
              />
              <path class="cls-3" d="M68.58,58.15V49.28H70.1v8.87Z" />
              <path
                class="cls-3"
                d="M80.25,53.72c0,2.84-1.34,4.58-3.28,4.58s-3.28-1.74-3.28-4.58S75,49.14,77,49.14,80.25,50.87,80.25,53.72ZM77,50.48c-.94,0-1.76,1-1.76,3.24S76,57,77,57s1.76-1,1.76-3.23S77.91,50.48,77,50.48Z"
              />
              <path
                class="cls-3"
                d="M83.76,58.15V49.28h1.62L88.18,55h0V49.28h1.35v8.87H88.23l-3.1-6.22h0v6.22Z"
              />
              <path
                class="cls-3"
                d="M95.31,49.28h1.34l2.75,8.87H97.85l-.74-2.35H94.88l-.72,2.35H92.59Zm.66,2.3h0l-.76,2.87h1.55Z"
              />
              <path
                class="cls-3"
                d="M102.41,58.15V49.28h1.52V56.8h2.81v1.35Z"
              />
            </svg>

            <RootNav data={rootNavArr} />
            <Link to="/planning">
              <button className="bg-white/20 p-2 text-white hover:bg-white/40">
                Planning Assistance
              </button>
            </Link>
            <Link to="/getinvolved">
              <button className="bg-white/20 p-2 text-white hover:bg-white/40">
                Get Involved
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
