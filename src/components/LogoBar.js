import React from "react";
import Icon, { Dvrpc } from "./Icon";
import SocialMedia from "./SocialMedia";
import TopNav from "./TopNav";

const LogoBar = () => (
  <div className="container mx-auto grid px-8 md:grid-cols-[auto_1fr]">
    <a href="/" className="row-span-2">
      <Icon use={Dvrpc} scale={null} className="mx-auto my-8 h-[70.5px]" />
    </a>
    <SocialMedia />
    <TopNav />
  </div>
);

export default LogoBar;
