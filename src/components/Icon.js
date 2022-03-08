import React from "react";
import PropTypes from "prop-types";
import tw, { css } from "twin.macro";

import twitter from "../images/twitter.svg";
import facebook from "../images/facebook.svg";
import linkedin from "../images/linkedin.svg";
import youtube from "../images/youtube.svg";
import instagram from "../images/instagram.svg";
import mail from "../images/mail.svg";
import news from "../images/news.svg";
import events from "../images/events.svg";
import products from "../images/products.svg";
import leftarrow from "../images/leftarrow.svg";
import rightarrow from "../images/rightarrow.svg";
import search from "../images/search.svg";
import dvrpc from "../images/dvrpc.svg";
import dvrpcMini from "../images/dvrpc-mini.svg";
import connections2050 from "../images/connections2050icon.svg";

const svg = {
  twitter,
  facebook,
  linkedin,
  youtube,
  instagram,
  mail,
  news,
  events,
  products,
  leftarrow,
  rightarrow,
  search,
  dvrpc,
  dvrpcMini,
  connections2050,
};

const Icon = ({ use, scale = 6, fillColor = "#0078ae", ...props }) => {
  if (!use in svg) {
    return null;
  }
  return (
    <svg
      css={css`
        fill: ${fillColor};
        height: ${scale / 4}rem;
      `}
      viewBox={svg[use].viewBox}
      title={svg[use].title}
      {...props}
    >
      <use xlinkHref={svg[use].symbol} />
    </svg>
  );
};

export default Icon;
