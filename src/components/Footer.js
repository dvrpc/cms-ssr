import React from "react";
import { Link } from "gatsby";
import FooterAds from "./FooterAds";
import Icon, { DvrpcMini } from "./Icon";

const Footer = () => {
  return (
    <>
      <footer className="flex justify-center bg-white">
        <div className="container">
          <FooterAds />
        </div>
      </footer>
      <footer className="flex justify-center text-white bg-[#3a3a3a]">
        <div className="container">
          <div className="mx-4 md:mx-8 my-6 md:flex justify-between">
            <div>
              <Link to="/" className="no-underline leading-none">
                <Icon use={DvrpcMini} className="h-8" fillColor="#fff" />
              </Link>
              <p>
                190 N Independence Mall West, 8th Floor
                <br />
                Philadelphia, PA 19106-1520
                <br />
                215.592.1800
              </p>
            </div>
            <div className="mt-4 md:m-0">
              <Link to="/Policies/">Policies</Link> |{" "}
              <a
                href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
                rel="noopener"
              >
                Sign Up for Our Email Lists
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
