import React from "react";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div className="justify-stretch m-4 grid items-center divide-y divide-[#d1d5db] md:auto-cols-fr md:grid-flow-col md:justify-between md:divide-y-0 md:divide-x">
      {ads.map((i) => (
        <div key={i.href} className="flex justify-center py-6 md:p-0">
          <a
            href={i.href}
            target={i.new_window ? "_blank" : "_self"}
            className="flex items-center"
          >
            <img src={i.src} alt={i.label} style={i.style} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default FooterAds;
