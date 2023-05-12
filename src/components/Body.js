import React from "react";
import Menu from "./Menu.obsolete";
import InfoLinks from "./InfoLinks";

import "../styles/Body.css";
import "../styles/BalloonCSS.css";

const Body = ({ children, title, menu }) => {
  return (
    <div className="container mx-auto my-4 grid gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:grid-cols-3">
      <h1 className="mt-1 max-w-[80ch] px-4 text-4xl font-bold text-[color:var(--color-h1)] print:max-w-full md:col-span-2 md:col-start-2 md:p-0">
        {title}
      </h1>
      <div className="px-4 pt-0 print:p-0 md:col-span-2 md:col-start-2 md:row-start-2 md:p-0">
        <main className="max-w-[80ch] print:max-w-full">
          <article>{children}</article>
        </main>
      </div>
      <div className="flex flex-col p-4 italic print:hidden md:col-span-1 md:col-start-1 md:row-start-2 md:mt-4 md:items-end md:p-0">
        <Menu data={menu} />
        <InfoLinks />
      </div>
    </div>
  );
};

export default Body;
