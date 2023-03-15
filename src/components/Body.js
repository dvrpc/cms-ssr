import React from "react";
import Menu from "./Menu.obsolete";
import InfoLinks from "./InfoLinks";

import "../styles/Body.css";
import "../styles/BalloonCSS.css";

const Body = ({ children, title, menu }) => {
  return (
    <div className="container mx-auto my-4 grid gap-x-12 sm:grid-cols-1 md:grid-cols-3">
      <h1 className="px-8 md:p-0 md:col-span-2 md:col-start-2 mt-1 text-4xl font-bold text-[color:var(--color-h1)]">
        {title}
      </h1>
      <div className="md:col-start-2 md:row-start-2 pt-0 px-8 md:col-span-2 md:p-0">
        <main className="max-w-[80ch]">
          <article>{children}</article>
        </main>
      </div>
      <div className="md:col-start-1 md:row-start-2 flex flex-col p-4 italic md:col-span-1 md:mt-4 md:items-end md:p-0">
        <Menu data={menu} />
        <InfoLinks />
      </div>
    </div>
  );
};

export default Body;
