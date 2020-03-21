import React from "react";
import { css } from "styled-components/macro";
import tw from "twin.macro";
import FooterAds from "./FooterAds";
import Nav from "./Nav";
import quicklinks from "../configs/quicklinks";

const Footer = () => {
  return (
    <footer
      css={css`
        ${tw`flex justify-center bg-white py-4 border-t`}
        border-color: #aaa;
        color: rgba(0, 0, 0, 0.7);
      `}
    >
      <div
        css={css`
          ${tw`mx-4 flex flex-wrap justify-between`}
          width: 120ch;
        `}
      >
        <div css={tw`w-1/2`}>
          <FooterAds />
        </div>
        <div css={tw`w-1/2 flex flex-wrap justify-between items-end`}>
          <div>
            <Nav data={quicklinks} />
          </div>
          <div>
            <a href="/" css={tw`no-underline leading-none`}>
              <img
                src="https://www.dvrpc.org/img/homepage/logo_small.png"
                alt="DVRPC"
                css={tw`h-8`}
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
                css={css`
                  ${tw`block mt-4 py-2 px-4 rounded border border-solid no-underline`}
                  border-color: rgba(0,0,0,.7)
                `}
              >
                Sign up for our email lists
              </a>
            </p>
            <p />
          </div>
        </div>
        <p css={tw`w-full mt-16 text-sm`}>
          DVRPC fully complies with Title VI of the Civil Rights Act of 1964,
          the Civil Rights Restoration Act of 1987, Executive Order 12898 on
          Environmental Justice, and related nondiscrimination statutes and
          regulations in all programs and activities. DVRPC&#39;s website,
          www.dvrpc.org, may be translated into multiple languages. Publications
          and other public documents can be made available in alternative
          languages and formats, if requested. DVRPC public meetings are always
          held in ADA-accessible facilities, and in transit-accessible locations
          when possible. Auxiliary services can be provided to individuals who
          submit a request at least seven days prior to a public meeting.
          Requests will be accommodated to the greatest extent possible. Any
          person who believes they have been aggrieved by an unlawful
          discriminatory practice by DVRPC under Title VI has a right to file a
          formal complaint. Any such complaint may be in writing and filed with
          DVRPC&#39;s Title VI Compliance Manager and/or the appropriate state
          or federal agency within 180 days of the alleged discriminatory
          occurrence. For more information on DVRPC&#39;s Title VI program or to
          obtain a Title VI Complaint Form, please visit:
          www.dvrpc.org/GetInvolved/TitleVI, call (215) 592-1800, or email
          public_affairs@dvrpc.org.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
