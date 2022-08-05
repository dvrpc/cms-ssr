import React from "react";
import Icon, { Dvrpc } from "./Icon";
import SocialMedia from "./SocialMedia";
import TopNav from "./TopNav";

const LogoBar = () => (
  <div>
    <div className="container mx-auto grid md:grid-cols-[auto_1fr]">
      <a href="/" className="row-span-2">
        <Icon
          use={Dvrpc}
          scale={null}
          className="mx-auto my-8 h-[70.5px] sm:m-8"
        />
      </a>
      <SocialMedia />
      <TopNav />
    </div>
  </div>
);

export default LogoBar;
