import React from "react";
import tw, { css } from "twin.macro";
import A from "./A";
import Icon from "./Icon";

const SocialMedia = () => {
  const items = [
    <A
      key="newsletters"
      href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
      aria-label="Newsletters"
    >
      <Icon
        css={css`
          background-position: -1px 0;
          width: 27px;
        `}
      >
        Newsletters
      </Icon>
    </A>,
    <A
      key="facebook"
      href="https://www.facebook.com/DVRPC"
      aria-label="Facebook"
    >
      <Icon
        css={css`
          background-position: -128px 0;
        `}
      >
        Facebook
      </Icon>
    </A>,
    <A key="twitter" href="https://www.twitter.com/DVRPC" aria-label="Twitter">
      <Icon
        css={css`
          background-position: -92px 0;
        `}
      >
        Twitter
      </Icon>
    </A>,
    <a
      key="instagram"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.instagram.com/dvrpc/"
      aria-label="Instagram"
    >
      <Icon
        css={css`
          background-position: -110px 0;
        `}
      >
        Instagram
      </Icon>
    </a>,
    <A
      key="linkedin"
      href="http://www.linkedin.com/company/delaware-valley-regional-planning-commission"
      aria-label="LinkedIn"
    >
      <Icon
        css={css`
          background-position: -147px 0;
        `}
      >
        LinkedIn
      </Icon>
    </A>,
    <a
      key="youtube"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.youtube.com/channel/UCEU8UI5_iGkVypHP93b5jLA"
      aria-label="YouTube"
    >
      <Icon
        css={css`
          background-position: -66px 0;
          width: 26px;
        `}
      >
        YouTube
      </Icon>
    </a>,
  ];
  return (
    <ul tw="flex justify-end font-bold py-4">
      {items.map((i) => (
        <li key={i.props.href} tw="inline mx-2">
          {i}
        </li>
      ))}
    </ul>
  );
};

export default SocialMedia;
