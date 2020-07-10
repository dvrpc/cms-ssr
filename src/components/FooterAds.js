import React from "react";
import tw from "twin.macro";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div tw="w-full flex flex-wrap justify-center md:justify-between items-start">
      {ads.map((i) => (
        <a
          href={i.href}
          key={i.href}
          tw="m-4 w-48 h-40 flex items-center justify-center"
        >
          <img src={i.src} alt={i.label} />
        </a>
      ))}
    </div>
  );
};

export default FooterAds;
