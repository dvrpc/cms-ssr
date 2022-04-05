import React from "react";

import Twitter from "../images/twitter.svg";
import Facebook from "../images/facebook.svg";
import Linkedin from "../images/linkedin.svg";
import Youtube from "../images/youtube.svg";
import Instagram from "../images/instagram.svg";
import Mail from "../images/mail.svg";
import News from "../images/news.svg";
import Events from "../images/events.svg";
import Products from "../images/products.svg";
import Leftarrow from "../images/leftarrow.svg";
import Rightarrow from "../images/rightarrow.svg";
import Search from "../images/search.svg";
import Dvrpc from "../images/dvrpc.svg";
import DvrpcMini from "../images/dvrpc-mini.svg";
import Bikeped from "../images/bikeped.svg";
import Housing from "../images/housing.svg";
import Environment from "../images/housing.svg";
import Freight from "../images/freight.svg";
import Imagery from "../images/imagery.svg";
import Planning from "../images/planning.svg";
import Tip from "../images/tip.svg";
import Region from "../images/region.svg";
import Economy from "../images/economy.svg";
import Equity from "../images/equity.svg";
import Highways from "../images/highways.svg";
import Connections2050 from "../images/connections2050.svg";
import Health from "../images/health.svg";
import Transit from "../images/transit.svg";

const Icon = ({ use, scale = 6, fillColor = "#0078ae", ...props }) => {
  const Svg = use;
  return (
    <Svg
      style={{
        fill: fillColor,
        height: scale ? `${scale / 4}rem` : null,
      }}
      {...props}
    />
  );
};

export default Icon;
export {
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  News,
  Events,
  Products,
  Leftarrow,
  Rightarrow,
  Search,
  Dvrpc,
  DvrpcMini,
  Bikeped,
  Housing,
  Environment,
  Freight,
  Imagery,
  Planning,
  Tip,
  Region,
  Economy,
  Equity,
  Highways,
  Connections2050,
  Health,
  Transit,
};
