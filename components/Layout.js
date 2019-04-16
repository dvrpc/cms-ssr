/*eslint-env node*/
import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const handleClick = (section) => console.log(section);

const Nav = ({ children }) => (
  <nav className="mt4 nested-list-reset">
    <ul className="ma0 flex flex-column w-100 justify-around">{children}</ul>
  </nav>
);

const Layout = ({ title, description, children }) => {
  return (
    <>
      <Helmet titleTemplate="%s | DVRPC">
        <title>{title}</title>
        <meta name="description" content={description} />
        <body className="bg-near-white sans-serif" />
      </Helmet>
      <header
        className="bg-white"
        css={{
          height: "400px",
          background:
            "bottom url(https://www.dvrpc.org/img/banner/full/philly1.jpg) no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div
          className="flex justify-center pb3"
          css={{ background: "rgba(255, 255, 255, 0.9)" }}
        >
          <div
            className="mh3 flex flex-wrap flex-nowrap-ns items-baseline justify-center justify-between-ns"
            css={{ flexBasis: "calc(80ch + 330px)" }}
          >
            <img
              src="https://www.dvrpc.org/img/homepage/dvrpclogo70px.png"
              alt="DVRPC"
              className="ma3 ml0"
            />
            <form
              className="w-auto-ns w-100 relative ml5-ns bg-white br2"
              action="https://www.dvrpc.org/Search/"
            >
              <div
                className="mw3 h-100 flex absolute items-center justify-center"
                css={{ pointerEvents: "none" }}
              >
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                  className="w2 h2 dib"
                  css={{
                    fill: "#777",
                    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    userSelect: "none",
                    flexShrink: 0,
                  }}
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  <path fill="none" d="M0 0h24v24H0z" />
                </svg>
              </div>
              <div className="w-100 color-inherit">
                <input
                  name="q"
                  placeholder="Search..."
                  className="sans-serif w5-ns w-100 bn ma0 pa2 pl5 color-inherit db bg-transparent"
                  css={{
                    minWidth: 0,
                    boxSizing: "content-box",
                    WebkitTapHighlightColor: "transparent",
                    transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  }}
                />
              </div>
            </form>
            <div css={{ width: "174px" }} />
          </div>
        </div>
      </header>
      <aside
        className="flex justify-center black-70"
        css={{ backgroundColor: "#cea77e" }}
      >
        <div
          className="flex justify-center justify-between mh3"
          css={{ width: "calc(80ch + 330px)" }}
        >
          {["Announcements", "Products", "Events", "Twitter"].map((text) => (
            <h2
              className="link flex-auto fw7 f4 lh-solid br--top br3 pt3 pl3 pb2 mt2 mr4 mb0 bg-white-20"
              onClick={() => handleClick(text)}
              key={text}
            >
              {text}
            </h2>
          ))}
        </div>
      </aside>
      <div className="flex justify-center">
        <Nav>
          {[
            { href: "/About/", text: "About Us" },
            { href: "/DataProducts/", text: "Data and Products" },
            {
              href: "/LongRangePlanAndTIP/",
              text: "Long-Range Plan and TIP",
            },
            { href: "/Transportation/", text: "Transportation" },
            {
              href: "/LandUseEnvironment/",
              text: "Land Use and Environment",
            },
            { href: "/Planning/", text: "Planning Assistance Center" },
            { href: "/CommuterServices/", text: "Commuter Services" },
            { href: "/GetInvolved/", text: "Get Involved" },
          ].map((i) => (
            <li
              className="pa2 pl3 ba b"
              css={{
                background: "linear-gradient(to right,#eee0d2 0,#f4f4f4 65%)",
                borderColor: "#eee0d2",
                marginBottom: "-1px",
              }}
              key={i.href}
            >
              <a href={i.href}>{i.text}</a>
            </li>
          ))}
        </Nav>
        <div id="root">{children}</div>
      </div>
      <footer className="flex justify-center bg-white black-70 pv3 bt b--light-silver">
        <div className="mh3 w-100 flex justify-between">
          <div className="w-50 flex flex-wrap justify-between items-end">
            <div>
              <a href="/" className="no-underline lh-solid">
                <img
                  src="https://www.dvrpc.org/img/homepage/logo_small.png"
                  alt="DVRPC"
                  className="h2"
                />
              </a>
              <p>
                190 N Independence Mall West
                <br />
                8th Floor
                <br />
                Philadelphia, PA 19106-1520
                <br />
                215.592.1800 | fax: 215.592.9125
              </p>
              <p>
                <a
                  href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
                  rel="noopener"
                  className="pv2 ph3 br2 ba b--black-70 hover-bg-near-white hover-black no-underline"
                >
                  Sign up for our email lists
                </a>
              </p>
              <p />
            </div>
            <div>
              <h4 className="ma0">LINKS</h4>
              <Nav>
                {[
                  { href: "/HumanResources/", text: "Careers" },
                  { href: "/Consultant/", text: "Consultant Opportunities" },
                  { href: "/Planning/", text: "Planning Assistance Center" },
                  { href: "/DataProducts/", text: "Data and Products" },
                  { href: "/Transportation/", text: "Transportation" },
                  { href: "/Policies/", text: "Policies" },
                  { href: "/Links/", text: "Other Links" },
                ].map((i) => (
                  <li key={i.text} className="mb0 bn pl0 pa1">
                    <a href={i.href}>{i.text}</a>
                  </li>
                ))}
              </Nav>
            </div>
            <p className="mt5 f6">
              DVRPC fully complies with Title VI of the Civil Rights Act of
              1964, the Civil Rights Restoration Act of 1987, Executive Order
              12898 on Environmental Justice, and related nondiscrimination
              statutes and regulations in all programs and activities.
              DVRPC&#39;s website, www.dvrpc.org, may be translated into
              multiple languages. Publications and other public documents can be
              made available in alternative languages and formats, if requested.
              DVRPC public meetings are always held in ADA-accessible
              facilities, and in transit-accessible locations when possible.
              Auxiliary services can be provided to individuals who submit a
              request at least seven days prior to a public meeting. Requests
              will be accommodated to the greatest extent possible. Any person
              who believes they have been aggrieved by an unlawful
              discriminatory practice by DVRPC under Title VI has a right to
              file a formal complaint. Any such complaint may be in writing and
              filed with DVRPC&#39;s Title VI Compliance Manager and/or the
              appropriate state or federal agency within 180 days of the alleged
              discriminatory occurrence. For more information on DVRPC&#39;s
              Title VI program or to obtain a Title VI Complaint Form, please
              visit: www.dvrpc.org/GetInvolved/TitleVI, call (215) 592-1800, or
              email public_affairs@dvrpc.org.
            </p>
          </div>
          <div className="w-50 bl b--light-gray ml3 pl3">
            <div className="flex flex-wrap items-start">
              {[
                {
                  href: "/Connections2045/",
                  src: "https://www.dvrpc.org/img/LRP_ConnectionsGraphic.png",
                },
                {
                  href: "/AnnualReport/",
                  src: "https://www.dvrpc.org/img/AR2018_placard.png",
                },
                {
                  href: "/Newsroom/",
                  src: "https://www.dvrpc.org/img/dvrpcnews.png",
                },
                {
                  href: "/GetInvolved/",
                  src: "https://www.dvrpc.org/img/getinvolved.png",
                },
              ].map((i) => (
                <a
                  href={i.href}
                  key={i.href}
                  className="ma3 flex items-center justify-center"
                  css={{ width: "200px", height: "175px" }}
                >
                  <img src={i.src} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Nav.propTypes = {
  children: PropTypes.node,
};

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default Layout;
