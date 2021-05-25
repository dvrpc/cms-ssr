import React from "react";
import tw, { css } from "twin.macro";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div tw="w-full py-4 flex flex-wrap justify-between items-start">
      {ads.map((i) => (
        <div
          key={i.href}
          tw="flex-1 flex self-stretch justify-center"
          css={css`
            &:not(:last-of-type):after {
              border-right: 1px solid #d1d5db;
              content: "";
              margin: 1rem auto;
            }
            &:last-of-type {
              ${tw`flex-none`}
            }
          `}
        >
          <a
            href={i.href}
            target={i.new_window ? "_blank" : "_self"}
            tw="flex items-center"
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
