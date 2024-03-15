import React from "react";
import A from "./A";
import Icon, { Facebook, Twitter, Linkedin } from "./Icon";

const ConnectWithUs = ({ title, location, fillColor = "#005780" }) => {
  const items = [
    <a
      target="_blank"
      href={`mailto:?to=&subject=${title}&body=I think you may find this resource interesting: ${location}`}
    >
      Share this page
    </a>,
    <A
      key="facebook"
      href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}
      aria-label="Facebook"
    >
      <Icon use={Facebook} />
    </A>,
    <A
      key="linkedin"
      href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}&amp;title=${title}`}
      aria-label="LinkedIn"
    >
      <Icon use={Linkedin} />
    </A>,
    <A
      key="twitter"
      href={`https://twitter.com/intent/tweet?text=${title}&via=DVRPC&url=${location}`}
      aria-label="Twitter"
    >
      <Icon use={Twitter} />
    </A>,
  ];
  return (
    <ul
      className="mt-2 flex list-none divide-x divide-current whitespace-nowrap p-0 font-bold sm:m-0 md:justify-end md:p-4"
      style={{
        color: fillColor,
      }}
    >
      {items.map((i) => (
        <li
          key={i.props ? i.props.href : "connect"}
          className="px-2 first:pl-0"
        >
          {i}
        </li>
      ))}
    </ul>
  );
};

export default ConnectWithUs;
