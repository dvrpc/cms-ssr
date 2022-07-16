import React from "react";
import A from "./A";
import Icon, {
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "./Icon";

const SocialMedia = () => {
  const items = [
    <A
      key="newsletters"
      href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
      label="Newsletters"
    >
      <Icon use={Mail} />
    </A>,
    <A key="facebook" href="https://www.facebook.com/DVRPC" label="Facebook">
      <Icon use={Facebook} />
    </A>,
    <A key="twitter" href="https://www.twitter.com/DVRPC" label="Twitter">
      <Icon use={Twitter} />
    </A>,
    <A
      key="instagram"
      href="https://www.instagram.com/dvrpc/"
      label="Instagram"
    >
      <Icon use={Instagram} />
    </A>,
    <A
      key="linkedin"
      href="http://www.linkedin.com/company/delaware-valley-regional-planning-commission"
      label="LinkedIn"
    >
      <Icon use={Linkedin} />
    </A>,
    <A
      key="youtube"
      href="https://www.youtube.com/channel/UCEU8UI5_iGkVypHP93b5jLA"
      label="YouTube"
    >
      <Icon use={Youtube} />
    </A>,
  ];
  return (
    <ul className="m-0 hidden p-0 text-[#67abd1] md:flex md:items-end md:justify-end md:p-4">
      {items.map((i) => (
        <li key={i.props.href} className="block p-4 md:px-2 md:py-0">
          {i}
        </li>
      ))}
    </ul>
  );
};

export default SocialMedia;
