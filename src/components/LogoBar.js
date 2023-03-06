import React from "react";
import Icon, { Dvrpc } from "./Icon";
import ActionButtons from "./ActionButtons";
import TopNav from "./TopNav";

const LogoBar = () => (
  <div>
    <div className="container mx-auto grid grid-cols-1 text-sm md:grid-cols-3 md:px-8 lg:grid-cols-[auto_1fr] lg:text-base">
      <a href="/" className="row-span-2">
        <Icon
          use={Dvrpc}
          scale={null}
          className="my-8 ml-6 h-[70.5px] md:ml-0 lg:mx-auto"
        />
      </a>
      <ActionButtons />
      <TopNav />
    </div>
  </div>
);

export default LogoBar;
