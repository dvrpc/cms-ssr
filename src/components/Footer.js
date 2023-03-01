import React from "react";
import { Link } from "gatsby";
import FooterAds from "./FooterAds";
import Icon, { DvrpcMini } from "./Icon";

import quicklinks from "../configs/quicklinks";

const Footer = () => {
  return (
    <>
      <footer className="flex justify-center bg-white">
        <div className="container">
          <FooterAds />
        </div>
      </footer>
      <footer className="flex justify-center bg-[#3a3a3a] text-white">
        <div className="container px-8 py-4">
          <Link to="/" className="leading-none no-underline">
            <Icon use={DvrpcMini} scale={8} fillColor="#fff" />
          </Link>
          <p>
            190 N Independence Mall West, 8th Floor
            <br />
            Philadelphia, PA 19106-1520
            <br />
            215.592.1800
          </p>
          <div className="md:flex md:justify-between">
            <ul className="m-0 list-none gap-4 divide-stone-400 p-0 md:flex md:divide-x">
              {quicklinks.map((item, i) => {
                return (
                  <li key={i} className={i > 0 ? "md:pl-4" : ""}>
                    {item.type === "internal" ? (
                      <Link
                        className="no-underline hover:underline"
                        to={item.href}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <a
                        className="no-underline hover:underline"
                        href={item.href}
                      >
                        {item.title}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            <ul className="m-0 list-none gap-4 divide-stone-400 p-0 md:flex md:divide-x">
              <li>
                <Link
                  className="no-underline hover:underline md:pl-4"
                  to="/Policies/"
                >
                  Policies
                </Link>
              </li>
              <li>
                <a
                  href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
                  rel="noopener"
                  className="no-underline hover:underline md:pl-4"
                >
                  Sign Up for Our Email Lists
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
