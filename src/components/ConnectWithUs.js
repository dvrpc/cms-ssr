import React from "react";
import PropTypes from "prop-types";
import tw, { css } from "twin.macro";
import A from "./A";
import Icon from "./Icon";

const ConnectWithUs = ({ title, location }) => {
  const items = [
    "Share",
    <A
      key="facebook"
      href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}
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
    <A
      key="twitter"
      href={`https://twitter.com/home?status=${title} @DVRPC ${location}`}
      aria-label="Twitter"
    >
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
      href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}&amp;title=${title}`}
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
    <ul
      css={[
        tw`flex md:justify-end font-bold py-4`,
        css`
          color: #005780;
        `,
      ]}
    >
      {items.map((i) => (
        <li key={i.props ? i.props.href : "connect"} tw="inline mr-4">
          {i}
        </li>
      ))}
    </ul>
  );
};

ConnectWithUs.propTypes = {
  title: PropTypes.string,
  location: PropTypes.string,
};

export default ConnectWithUs;
