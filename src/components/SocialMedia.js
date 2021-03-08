import React from "react";
import tw, { css } from "twin.macro";
import A from "./A";
import Icon from "./Icon";

const SocialMedia = () => {
  const items = [
    <A
      key="newsletters"
      href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
      label="Newsletters"
    >
      <Icon
        css={css`
          background-position: 0 -12px;
          width: 35px;
        `}
      >
        Newsletters
      </Icon>
    </A>,
    <A key="facebook" href="https://www.facebook.com/DVRPC" label="Facebook">
      <Icon
        css={css`
          background-position: -174px -12px;
        `}
      >
        Facebook
      </Icon>
    </A>,
    <A key="twitter" href="https://www.twitter.com/DVRPC" label="Twitter">
      <Icon
        css={css`
          background-position: -123px -12px;
        `}
      >
        Twitter
      </Icon>
    </A>,
    <A
      key="instagram"
      href="https://www.instagram.com/dvrpc/"
      label="Instagram"
    >
      <Icon
        css={css`
          background-position: -148.4px -12px;
        `}
      >
        Instagram
      </Icon>
    </A>,
    <A
      key="linkedin"
      href="http://www.linkedin.com/company/delaware-valley-regional-planning-commission"
      label="LinkedIn"
    >
      <Icon
        css={css`
          background-position: -199px -12px;
        `}
      >
        LinkedIn
      </Icon>
    </A>,
    <A
      key="youtube"
      href="https://www.youtube.com/channel/UCEU8UI5_iGkVypHP93b5jLA"
      label="YouTube"
    >
      <Icon
        css={css`
          background-position: -91px -12px;
          width: 30px;
        `}
      >
        YouTube
      </Icon>
    </A>,
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
