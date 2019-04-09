import React from "react";

const A = ({ href, children }) => {
  return (
    <a
      className="db"
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

const Icon = ({ className, style, children, ...props }) => {
  return (
    <i
      {...props}
      css={{
        top: "1px",
        background:
          "transparent url(https://www.dvrpc.org/img/homepage/sprites.svg) no-repeat",
        backgroundSize: "139px 18px",
        textIndent: "-9999rem",
        height: "18px",
        width: "18px",
        ...style
      }}
      className={`relative dib ${className}`}
    >
      {children}
    </i>
  );
};

const ConnectWithUs = ({ title, location }) => {
  return (
    <ul className="flex justify-end b pa0" css={{ color: "#0078ae" }}>
      {[
        "Connect With Us!",
        <A href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}>
          <Icon css={{ backgroundPosition: "-102px 0" }}>Facebook</Icon>
        </A>,
        <A href={`https://twitter.com/home?status=${title} @DVRPC ${location}`}>
          <Icon css={{ backgroundPosition: "-65px 0" }}>Twitter</Icon>
        </A>,
        <a
          rel="noopener"
          target="_blank"
          href="https://www.instagram.com/dvrpc/"
        >
          <Icon css={{ backgroundPosition: "-83px 0" }}>Instagram</Icon>
        </a>,
        <A
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${location}&amp;title=${title}`}
        >
          <Icon css={{ backgroundPosition: "-121px 0" }}>LinkedIn</Icon>
        </A>,
        <a
          rel="noopener"
          target="_blank"
          href="https://www.youtube.com/channel/UCEU8UI5_iGkVypHP93b5jLA"
        >
          <Icon css={{ backgroundPosition: "-38px 0", width: "26px" }}>
            YouTube
          </Icon>
        </a>
      ].map(i => (
        <li key={i.props ? i.props.href : "connect"} className="di mh2">
          {i}
        </li>
      ))}
    </ul>
  );
};

export default ConnectWithUs;
