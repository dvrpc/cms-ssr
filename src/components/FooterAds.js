import React from "react";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div className="m-4 grid md:grid-flow-col md:auto-cols-fr justify-stretch md:justify-between items-center divide-y md:divide-y-0 md:divide-x divide-[#d1d5db]">
      {ads.map((i) => (
        <div
          key={i.href}
          className="flex justify-center py-6 md:p-0"
        >
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
