import React from "react";
import { Link } from "gatsby";
import tw, { css } from "twin.macro";
import FooterAds from "./FooterAds";

const Footer = () => {
  return (
    <>
      <footer tw="flex justify-center bg-white" css={css`a { text-decoration:underline;}`}>
        <div tw="container">
          <FooterAds />
        </div>
      </footer>
      <footer
        tw="flex justify-center p-4 text-white"
        css={css`
          background-color: #3a3a3a;
        `}
      >
        <div tw="container">
          <div tw="w-full m-4 md:m-0 md:flex justify-between">
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
            <div tw="items-end flex flex-col">
              <div tw="mx-4 px-px">
                <a href="/Policies/">Policies</a> |{" "}
                <a href="/Links/">Other Links</a> |{" "}
                <a
                  href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
                  rel="noopener"
                >
                  Sign Up for Our Email Lists
                </a>
              </div>
            </div>
          </div>
          <p tw="p-4 md:p-0 md:mt-16 text-sm hidden">
            DVRPC fully complies with Title VI of the Civil Rights Act of 1964,
            the Civil Rights Restoration Act of 1987, Executive Order 12898 on
            Environmental Justice, and related nondiscrimination statutes and
            regulations in all programs and activities. DVRPC&#39;s website,
            www.dvrpc.org, may be translated into multiple languages.
            Publications and other public documents can be made available in
            alternative languages and formats, if requested. DVRPC public
            meetings are always held in ADA-accessible facilities, and in
            transit-accessible locations when possible. Auxiliary services can
            be provided to individuals who submit a request at least seven days
            prior to a public meeting. Requests will be accommodated to the
            greatest extent possible. Any person who believes they have been
            aggrieved by an unlawful discriminatory practice by DVRPC under
            Title VI has a right to file a formal complaint. Any such complaint
            may be in writing and filed with DVRPC&#39;s Title VI Compliance
            Manager and/or the appropriate state or federal agency within 180
            days of the alleged discriminatory occurrence. For more information
            on DVRPC&#39;s Title VI program or to obtain a Title VI Complaint
            Form, please visit:{" "}
            <Link to="/GetInvolved/TitleVI/">
              www.dvrpc.org/GetInvolved/TitleVI
            </Link>
            , call (215) 592-1800, or email{" "}
            <a href="mailto:public_affairs@dvrpc.org">
              public_affairs@dvrpc.org
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
