import React from "react";
import tw, { css } from "twin.macro";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div tw="w-full flex flex-wrap justify-center md:justify-between items-start">
      {ads.map((i) => (
        <div
          key={i.href}
          tw="flex-1 pr-px flex justify-center"
          css={css`
            &:not(:last-of-type) {
              background: linear-gradient(
                to bottom,
                transparent 30%,
                rgb(209, 213, 219) 30%,
                rgb(209, 213, 219) 70%,
                transparent 70%
              );
              background-size: 1px 100%;
              background-position: top right;
              background-repeat: no-repeat;
            }
          `}
        >
          <a href={i.href} tw="p-4 w-52 h-40 flex items-center">
            <img src={i.src} alt={i.label} css={i.style} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default FooterAds;
