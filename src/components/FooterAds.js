import React from "react";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div className="m-8 flex flex-col items-center justify-between gap-8 md:flex-row">
      {ads.map((i) => (
        <div key={i.href}>
          <a href={i.href} target={i.new_window ? "_blank" : "_self"}>
            <img src={i.src} alt={i.label} style={i.style} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default FooterAds;
