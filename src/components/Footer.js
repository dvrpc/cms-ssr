import React from "react";
import { Link } from "gatsby";
import tw, { css } from "twin.macro";
import FooterAds from "./FooterAds";

const Footer = () => {
  return (
    <>
      <footer tw="flex justify-center bg-white">
        <div tw="container">
          <FooterAds />
        </div>
      </footer>
      <footer
        tw="flex justify-center text-white"
        css={css`
          background-color: #3a3a3a;
        `}
      >
        <div tw="container">
          <div tw="m-6 md:flex justify-between">
            <div>
              <a href="/" tw="no-underline leading-none">
                <img
                  src="https://www.dvrpc.org/img/gatsby/5546_DVRPC_Aconym.png"
                  alt="DVRPC"
                  css={css`
                    height: 29px;
                  `}
                />
              </a>
              <p>
                190 N Independence Mall West, 8th Floor
                <br />
                Philadelphia, PA 19106-1520
                <br />
                215.592.1800
              </p>
            </div>
            <div tw="mt-4 md:m-0">
              <a href="/Policies/">Policies</a> |{" "}
              <a href="/Links/">Resources</a> |{" "}
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
