import React from "react";
import PropTypes from "prop-types";
import tw, { css } from "twin.macro";
import A from "./A";
import Icon from "./Icon";

const ConnectWithUs = ({ title, location, fillColor = "#005780" }) => {
  const items = [
    <a
      target="_blank"
      href={`mailto:?to=&subject=${title}&body=I think you may find this resource interesting: ${location}`}
      css={css`
        color: ${fillColor};
      `}
    >
      Share this page
    </a>,
    <A
      key="facebook"
      href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}
      aria-label="Facebook"
    >
      <Icon use="facebook" fillColor={fillColor} />
    </A>,
    <A
      key="twitter"
      href={`https://twitter.com/intent/tweet?text=${title}&via=DVRPC&url=${location}`}
      aria-label="Twitter"
    >
      <Icon use="twitter" fillColor={fillColor} />
    </A>,
    <A
      key="linkedin"
      href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}&amp;title=${title}`}
      aria-label="LinkedIn"
    >
      <Icon use="linkedin" fillColor={fillColor} />
    </A>,
  ];
  return (
    <ul
      tw="flex justify-center md:justify-end font-bold py-4 divide-x"
      css={css`
        & > :last-of-type {
          padding-right: 0;
        }
      `}
    >
      {items.map((i) => (
        <li
          key={i.props ? i.props.href : "connect"}
          tw="inline px-2"
          css={css`
            border-color: ${fillColor};
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
