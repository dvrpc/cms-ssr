import React from "react";
import Icon, { Dvrpc } from "./Icon";
import SocialMedia from "./SocialMedia";
import TopNav from "./TopNav";

const LogoBar = () => (
  <div className="container mx-auto grid grid-cols-2 grid-rows-2 items-center px-8 md:grid-cols-[auto_1fr] h-[calc(2.5rem+70.5px)]">
    <a href="/" className="row-span-2 self-end mb-5">
      <Icon use={Dvrpc} scale={null} className="mx-auto h-[70.5px]" />
    </a>
    <SocialMedia />
    <TopNav />
  </div>
);

export default LogoBar;
