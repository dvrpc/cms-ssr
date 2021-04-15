import React from "react";
import PropTypes from "prop-types";
import tw, { css } from "twin.macro";
import A from "./A";
import Icon from "./Icon";

const ConnectWithUs = ({ title, location }) => {
  const items = [
    <a
      target="_blank"
      href={`mailto:?to=&subject=${title}&body=I think you may find this resource interesting: ${location}`}
    >
      Share
    </a>,
    <A
      key="facebook"
      href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}
      aria-label="Facebook"
    >
      <Icon use="facebook" />
    </A>,
    <A
      key="twitter"
      href={`https://twitter.com/intent/tweet?text=${title}&via=DVRPC&url=${location}`}
      aria-label="Twitter"
    >
      <Icon use="twitter" />
    </A>,
    <A
      key="linkedin"
      href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}&amp;title=${title}`}
      aria-label="LinkedIn"
    >
      <Icon use="linkedin" />
    </A>,
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
