import React from "react";
import tw, { css } from "twin.macro";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div tw="w-full py-4 grid grid-flow-col divide-x items-stretch">
      {ads.map((i) => (
        <div key={i.href} tw="flex items-center justify-center">
          <a
            href={i.href}
            target={i.new_window ? "_blank" : "_self"}
            tw="flex items-center justify-center"
          >
            <img
              src={i.src}
              alt={i.label}
              css={css`
                ${i.style}
              `}
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default FooterAds;
