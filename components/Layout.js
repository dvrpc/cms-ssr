/*eslint-env node*/
import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import Nav from "./Nav";

const Layout = ({ title, description, nav, children }) => {
  return (
    <>
      <Helmet titleTemplate="%s | DVRPC">
        <title>{title}</title>
        <meta name="description" content={description} />
        <body className="bg-gray-100 font-sans" />
      </Helmet>
      <header
        className="bg-white"
        css={{
          height: "400px",
          background:
            "bottom url(https://www.dvrpc.org/img/banner/full/philly1.jpg) no-repeat",
          backgroundSize: "cover"
        }}
      >
        <div
          className="flex justify-center pb-4"
          css={{ background: "rgba(255, 255, 255, 0.9)" }}
        >
          <div
            className="mx-4 flex flex-wrap sm:flex-nowrap items-baseline justify-center sm:justify-between"
            css={{ flexBasis: "calc(80ch + 330px)" }}
          >
            <img
              src="https://www.dvrpc.org/img/homepage/dvrpclogo70px.png"
              alt="DVRPC"
              className="m-4 ml-0"
            />
            <form
              className="sm:w-auto w-full relative sm:ml-16 bg-white rounded"
              action="https://www.dvrpc.org/Search/"
            >
              <div
                className="mw3 h-full flex absolute items-center justify-center"
                css={{ pointerEvents: "none" }}
              >
                <svg
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                  className="w-8 h-8 inline-block"
                  css={{
                    fill: "#777",
                    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    userSelect: "none",
                    flexShrink: 0
                  }}
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  <path fill="none" d="M0 0h24v24H0z" />
                </svg>
              </div>
              <div className="w-full">
                <input
                  name="q"
                  placeholder="Search..."
                  className="font-sans sm:w-64 w-full border-0 border-none m-0 p-2 pl-16 block bg-transparent"
                  css={{
                    minWidth: 0,
                    boxSizing: "content-box",
                    WebkitTapHighlightColor: "transparent",
                    transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
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
          className="flex justify-center justify-between mx-4"
          css={{ width: "calc(80ch + 330px)" }}
        >
          {["Announcements", "Products", "Events", "Twitter"].map(text => (
            <h2
              className="link flex-auto font-bold text-xl leading-none br--top rounded-lg pt-4 pl-4 pb-2 mt-2 mr-8 mb-0 bg-white-20"
              onClick={() => handleClick(text)}
              key={text}
            >
              {text}
            </h2>
          ))}
        </div>
      </aside>
      <div className="flex justify-center">
        <Nav data={nav} />
        <div id="root">{children}</div>
      </div>
      <footer className="flex justify-center bg-white black-70 py-4 border-t b--light-silver">
        <div className="mx-4 w-full flex justify-between">
          <div className="w-50 flex flex-wrap justify-between items-end">
            <div>
              <a href="/" className="no-underline leading-none">
                <img
                  src="https://www.dvrpc.org/img/homepage/logo_small.png"
                  alt="DVRPC"
                  className="h-8"
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
                  className="py-2 px-4 rounded border border-solid b--black-70 hover-bg-near-white hover-black no-underline"
                >
                  Sign up for our email lists
                </a>
              </p>
              <p />
            </div>
            <div>
              <h4 className="m-0">LINKS</h4>
              <Nav
                data={[
                  { url: { path: "/HumanResources/" }, label: "Careers" },
                  {
                    url: { path: "/Business/" },
                    label: "Business Opportunities"
                  },
                  {
                    url: { path: "/Planning/" },
                    label: "Planning Assistance Center"
                  },
                  {
                    url: { path: "/DataProducts/" },
                    label: "Data and Products"
                  },
                  {
                    url: { path: "/Transportation/" },
                    label: "Transportation"
                  },
                  { url: { path: "/Policies/" }, label: "Policies" },
                  { url: { path: "/Links/" }, label: "Other Links" }
                ]}
              />
            </div>
            <p className="mt-16 text-sm">
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
          <div className="w-50 lg:border border-gray-200 ml-4 pl-4">
            <div className="flex flex-wrap items-start">
              {[
                {
                  href: "/Connections2045/",
                  src: "https://www.dvrpc.org/img/LRP_ConnectionsGraphic.png"
                },
                {
                  href: "/AnnualReport/",
                  src: "https://www.dvrpc.org/img/AR2018_placard.png"
                },
                {
                  href: "/Newsroom/",
                  src: "https://www.dvrpc.org/img/dvrpcnews.png"
                },
                {
                  href: "/GetInvolved/",
                  src: "https://www.dvrpc.org/img/getinvolved.png"
                }
              ].map(i => (
                <a
                  href={i.href}
                  key={i.href}
                  className="m-4 flex items-center justify-center"
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

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  nav: PropTypes.array,
  children: PropTypes.node
};

export default Layout;
