import React from "react";
import tw, { css } from "twin.macro";
import A from "./A";
import Icon from "./Icon";

const SocialMedia = ({ fillColor = "#0078ae" }) => {
  const items = [
    <A
      key="newsletters"
      href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
      label="Newsletters"
    >
      <Icon use="mail" fillColor={fillColor} />
    </A>,
    <A key="facebook" href="https://www.facebook.com/DVRPC" label="Facebook">
      <Icon use="facebook" fillColor={fillColor} />
    </A>,
    <A key="twitter" href="https://www.twitter.com/DVRPC" label="Twitter">
      <Icon use="twitter" fillColor={fillColor} />
    </A>,
    <A
      key="instagram"
      href="https://www.instagram.com/dvrpc/"
      label="Instagram"
    >
      <Icon use="instagram" fillColor={fillColor} />
    </A>,
    <A
      key="linkedin"
      href="http://www.linkedin.com/company/delaware-valley-regional-planning-commission"
      label="LinkedIn"
    >
      <Icon use="linkedin" fillColor={fillColor} />
    </A>,
    <A
      key="youtube"
      href="https://www.youtube.com/channel/UCEU8UI5_iGkVypHP93b5jLA"
      label="YouTube"
    >
      <Icon use="youtube" fillColor={fillColor} />
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
