import React from "react";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div className="my-8 flex flex-col items-stretch divide-x divide-gray-400 md:flex-row">
      {ads.map((i) => (
        <div key={i.href} className="flex flex-1 items-center justify-center">
          <a href={i.href} target={i.new_window ? "_blank" : "_self"}>
            <img src={i.src} alt={i.label} style={i.style} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default FooterAds;
