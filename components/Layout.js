/*eslint-env node*/
import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { css } from "styled-components/macro";
import tw from "tailwind.macro";
import Header from "./Header";
import Infobar from "./Infobar";
import Nav from "./Nav";
import Footer from "./Footer";

const styles = css`
  ${tw`flex justify-center`}

  a {
    color: inherit;
  }

  .list-group {
    background-color: #fdfeff;
    border-radius: 2px;
    border: none;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.08), 0 2px 5px 0 rgba(0, 0, 0, 0.06);
    padding: 0;
    overflow: hidden;
    margin-bottom: 20px;

    & > .footer,
    & > footer {
      margin: 0 -18px -18px;
      padding: 4.5px 18px;
      background-color: #f7f7f7;
      text-align: right;
      border-top: 1px solid #eee;
      font-weight: 700;
    }
    & > li {
      position: relative;
      display: block;
      padding: 10px 15px;
      margin-bottom: -1px;
      background-color: #fdfeff;
      border: 1px solid #ddd;
    }
  }
  .list-group-heading:first-of-type,
  .list-group-item:first-of-type {
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
  }
  .list-group-heading:last-child,
  .list-group-item:last-child {
    margin-bottom: 0;
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  .list-group-heading {
    color: #717171;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
  }
  a.list-group-item {
    color: #555;
  }
  a.list-group-item .list-group-item-heading {
    color: #333;
  }
  a.list-group-item:focus,
  a.list-group-item:hover {
    text-decoration: none;
    color: #555;
    background-color: #f5f5f5;
  }
  .list-group-item.disabled,
  .list-group-item.disabled:focus,
  .list-group-item.disabled:hover {
    background-color: #ddd;
    color: #717171;
    cursor: disabled;
  }
  .list-group-item.disabled .list-group-item-heading,
  .list-group-item.disabled:focus .list-group-item-heading,
  .list-group-item.disabled:hover .list-group-item-heading {
    color: inherit;
  }
  .list-group-item.disabled .list-group-item-text,
  .list-group-item.disabled:focus .list-group-item-text,
  .list-group-item.disabled:hover .list-group-item-text {
    color: #717171;
  }
  .list-group-item.active,
  .list-group-item.active:focus,
  .list-group-item.active:hover {
    z-index: 2;
    color: #fff;
    background-color: #0078ae;
    border-color: #0078ae;
  }
  .list-group-item.active .list-group-item-heading,
  .list-group-item.active .list-group-item-heading > .small,
  .list-group-item.active .list-group-item-heading > small,
  .list-group-item.active:focus .list-group-item-heading,
  .list-group-item.active:focus .list-group-item-heading > .small,
  .list-group-item.active:focus .list-group-item-heading > small,
  .list-group-item.active:hover .list-group-item-heading,
  .list-group-item.active:hover .list-group-item-heading > .small,
  .list-group-item.active:hover .list-group-item-heading > small {
    color: inherit;
  }
  .list-group-item.active .list-group-item-text,
  .list-group-item.active:focus .list-group-item-text,
  .list-group-item.active:hover .list-group-item-text {
    color: #7bd6ff;
  }
  .list-group-item-heading {
    margin-top: 0;
    margin-bottom: 5px;
  }
  .list-group-item-text {
    margin-bottom: 0;
    line-height: 1.3;
  }
  .card {
    background-color: #fdfeff;
    border-radius: 2px;
    border: none;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.08), 0 2px 5px 0 rgba(0, 0, 0, 0.06);
    padding: 18px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .card > h2:first-of-type {
    margin: -18px -18px 0;
    padding: 9px 18px;
    background-color: #2d799a;
    color: #fff;
  }
  .card > h3:first-of-type {
    margin: -18px -18px 0;
    padding: 9px 18px;
    background-color: #4b6a77;
    color: #fff;
  }
  .card > .footer,
  .card > footer {
    margin: 0 -18px -18px;
    padding: 4.5px 18px;
    background-color: #f7f7f7;
    text-align: right;
    border-top: 1px solid #eee;
    font-weight: 700;
  }
  .card .list-group {
    margin-left: -18px;
    margin-right: -18px;
    box-shadow: none;
  }
  .card .list-group > .list-group-heading,
  .card .list-group > .list-group-item {
    border-radius: 0;
    border-left-width: 0;
    border-right-width: 0;
  }
  .card :first-of-type + .list-group {
    margin-top: 0;
  }
  .card .list-group:last-child {
    margin-bottom: -18px;
  }
  .list-group > h2:first-of-type {
    margin: 0;
    padding: 9px 18px;
    background-color: #2d799a;
    color: #fff;
  }
  .list-group > h3:first-of-type {
    margin: 0;
    padding: 9px 18px;
    background-color: #4b6a77;
    color: #fff;
  }
`;

const Layout = ({ nav, main }) => {
  return (
    <>
      <Helmet>
        <body
          style={`
            background-color: #f7fafc;	
            font-family: 'Roboto', sans-serif;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -webkit-font-kerning: normal;
            font-kerning: normal;
            font-feature-settings: "kern", "salt", "liga", "tnum";
            font-variant-ligatures: contextual common-ligatures;
            line-height: 1.4;
          `}
        />
      </Helmet>
      <Header />
      <Infobar />
      <div css={styles}>
        <div
          css={css`
            width: 40ch;
          `}
        >
          <Nav data={nav} />
        </div>
        {main}
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  nav: PropTypes.array,
  main: PropTypes.node,
};

export default Layout;