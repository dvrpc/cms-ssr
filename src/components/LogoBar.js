import React from "react";
import Icon, { Dvrpc } from "./Icon";
import SocialMedia from "./SocialMedia";

const LogoBar = () => (
  <div className="container md:px-8 mx-auto flex flex-wrap items-end justify-center sm:justify-between">
    <a href="/" className="block self-center">
      <Icon use={Dvrpc} scale={null} className="m-8 md:ml-0 h-[70.5px]" />
    </a>
    <SocialMedia />
  </div>
);

export default LogoBar;
