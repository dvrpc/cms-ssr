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
      <Icon use="facebook" />
    </A>,
    <A
      key="twitter"
      href={`https://twitter.com/home?status=${title} @DVRPC ${location}`}
      aria-label="Twitter"
    >
      <Icon use="twitter" />
    </A>,
    <a
      key="instagram"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.instagram.com/dvrpc/"
      aria-label="Instagram"
    >
      <Icon use="instagram" />
    </a>,
    <A
      key="linkedin"
      href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}&amp;title=${title}`}
      aria-label="LinkedIn"
    >
      <Icon use="linkedin" />
    </A>,
    <a
      key="youtube"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.youtube.com/channel/UCEU8UI5_iGkVypHP93b5jLA"
      aria-label="YouTube"
    >
      <Icon use="youtube" />
    </a>,
  ];
  return (
    <ul
      css={[
        tw`flex md:justify-end font-bold py-4 divide-x divide-gray-900`,
        css`
          color: #005780;
        `,
      ]}
    >
      {items.map((i) => (
        <li
          key={i.props ? i.props.href : "connect"}
          tw="inline px-2"
          css={css`
            filter: grayscale(100%);
          `}
        >
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
