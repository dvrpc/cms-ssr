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
import bikeped from "../images/bikeped.svg";
import connections2050 from "../images/connections2050.svg";
import economy from "../images/economy.svg";
import environment from "../images/environment.svg";
import equity from "../images/equity.svg";
import freight from "../images/freight.svg";
import health from "../images/health.svg";
import highways from "../images/highways.svg";
import housing from "../images/housing.svg";
import imagery from "../images/imagery.svg";
import planning from "../images/planning.svg";
import region from "../images/region.svg";
import tip from "../images/tip.svg";
import transit from "../images/transit.svg";

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
  bikeped,
  connections2050,
  economy,
  environment,
  equity,
  freight,
  health,
  highways,
  housing,
  imagery,
  planning,
  region,
  tip,
  transit,
};

const Icon = ({ use, scale = 6, fillColor = "#0078ae", ...props }) => {
  if (!use in svg) {
    return null;
  }
  return (
    <svg
      css={css`
        color: ${fillColor};
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
