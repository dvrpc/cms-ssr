import React from "react";
import "./ConnectWithUs.css";

const A = ({ href, children }) => {
  return (
    <a
      href={href}
      onClick={(e) => {
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

const ConnectWithUs = ({ title, location }) => {
  return (
    <ul className="ConnectWithUs">
      <li>Connect With Us!</li>
      <li>
        <A href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}>
          <i className="icon icon-fb">Facebook</i>
        </A>
      </li>
      <li>
        <A href={`https://twitter.com/home?status=${title} @DVRPC ${location}`}>
          <i className="icon icon-twitter">Twitter</i>
        </A>
      </li>
      <li>
        <a
          rel="noopener"
          target="_blank"
          href="https://www.instagram.com/dvrpc/"
        >
          <i className="icon icon-instagram">Instagram</i>
        </a>
      </li>
      <li>
        <A
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}&amp;title=${title}`}
        >
          <i className="icon icon-linkedin">LinkedIn</i>
        </A>
      </li>
      <li>
        <a
          rel="noopener"
          target="_blank"
          href="https://www.youtube.com/channel/UCEU8UI5_iGkVypHP93b5jLA"
        >
          <i className="icon icon-youtube">YouTube</i>
        </a>
      </li>
    </ul>
  );
};

export default ConnectWithUs;
