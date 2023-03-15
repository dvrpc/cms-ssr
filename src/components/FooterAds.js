import React from "react";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div className="-mx-4 flex flex-col items-stretch gap-y-8 divide-gray-400 md:flex-row md:divide-x">
      {ads.map((i) => (
        <div
          key={i.href}
          className="flex flex-1 items-center justify-center px-4"
        >
          <a href={i.href} target={i.new_window ? "_blank" : "_self"}>
            <img src={i.src} alt={i.label} style={i.style} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default FooterAds;
