import React from "react";
import Menu from "./Menu.obsolete";
import InfoLinks from "./InfoLinks";

import "../styles/Body.css";
import "../styles/BalloonCSS.css";

const Body = ({ children, title, menu }) => {
  return (
    <div className="container mx-auto my-4 grid items-start gap-12 sm:grid-cols-1 md:grid-cols-3">
      <div className="p-4 md:order-2 md:col-span-2 md:p-0">
        <main className="max-w-[80ch]">
          <h1 className="mt-6">{title}</h1>
          <article>{children}</article>
        </main>
      </div>
      <div className="flex flex-col md:order-1 md:col-span-1 md:mt-16 md:items-end">
        <Menu data={menu} />
        <InfoLinks />
      </div>
    </div>
  );
};

export default Body;
