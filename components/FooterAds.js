import React from "react";
import { css } from "styled-components/macro";
import tw from "tailwind.macro";
import ads from "../configs/ads";

const FooterAds = () => {
  return (
    <div css={tw`flex flex-wrap items-start`}>
      {ads.map((i) => (
        <a
          href={i.href}
          key={i.href}
          css={css`
            ${tw`m-4 flex items-center justify-center`}
            width: 200px;
            height: 175px;
          `}
        >
          <img src={i.src} alt={i.label} />
        </a>
      ))}
    </div>
  );
};

export default FooterAds;
