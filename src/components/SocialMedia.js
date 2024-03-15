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
      <Icon scale={4} use={Mail} />
    </A>,
    <A key="facebook" href="https://www.facebook.com/DVRPC" label="Facebook">
      <Icon scale={4} use={Facebook} />
    </A>,
    <A
      key="instagram"
      href="https://www.instagram.com/dvrpc/"
      label="Instagram"
    >
      <Icon scale={4} use={Instagram} />
    </A>,
    <A
      key="linkedin"
      href="http://www.linkedin.com/company/delaware-valley-regional-planning-commission"
      label="LinkedIn"
    >
      <Icon scale={4} use={Linkedin} />
    </A>,
    <A
      key="youtube"
      href="https://www.youtube.com/channel/UCEU8UI5_iGkVypHP93b5jLA"
      label="YouTube"
    >
      <Icon scale={4} use={Youtube} />
    </A>,
    <A
      id="twitter-header-icon"
      key="twitter"
      href="https://www.twitter.com/DVRPC"
      label="Twitter"
    >
      <Icon scale={3.75} use={Twitter} />
    </A>,
  ];
  return (
    <ul className="m-0 hidden p-0 text-[#67abd1] md:items-end md:justify-end xl:flex">
      {items.map((i) => (
        <li
          id={i.props.id && i.props.id}
          key={i.props.href}
          className="-mr-2 block pt-2 pb-5 hover:text-[#0078ae] md:px-3"
        >
          {i}
        </li>
      ))}
    </ul>
  );
};

export default SocialMedia;
