/*eslint-env browser*/
import React from "react";
import PropTypes from "prop-types";
import { css } from "styled-components/macro";
import tw from "twin.macro";

const A = ({ href, children }) => {
  return (
    <a
      css={tw`block`}
      href={href}
      onClick={e => {
        e.preventDefault();
        window.open(
          href,
          null,
          "toolbar=0, location=0, menubar=0, directories=0, noopener"
        );
      }}
    >
      {children}
    </a>
  );
};

const Icon = ({ style, children, ...props }) => {
  const styles = css`
    ${tw`relative inline-block`}
    top: 1px;
    background: transparent url(https://www.dvrpc.org/img/homepage/sprites.svg)
      no-repeat;
    background-size: 139px 18px;
    text-indent: -9999rem;
    height: 18px;
    width: 18px;
    ${style}
  `;
  return (
    <i {...props} css={styles}>
      {children}
    </i>
  );
};

const ConnectWithUs = ({ title, location }) => {
  const items = [
    "Connect With Us!",
    <A
      key="facebook"
      href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}
      aria-label="Facebook"
    >
      <Icon
        css={css`
          background-position: -102px 0;
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
          background-position: -65px 0;
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
          background-position: -83px 0;
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
          background-position: -121px 0;
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
          background-position: -38px 0;
          width: 26px;
        `}
      >
        YouTube
      </Icon>
    </a>
  ];
  return (
    <ul
      css={css`
        ${tw`flex justify-end font-bold p-0`}
        color: #005780;
      `}
    >
      {items.map(i => (
        <li key={i.props ? i.props.href : "connect"} css={tw`inline mx-2`}>
          {i}
        </li>
      ))}
    </ul>
  );
};

A.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
};

Icon.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
};

ConnectWithUs.propTypes = {
  title: PropTypes.string,
  location: PropTypes.string
};

export default ConnectWithUs;
