import React from "react";
import tw, { css } from "twin.macro";
import Async from "react-async";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components/macro";
import Header from "../components/Header";

import Infobar from "../components/Infobar";
import Menu from "../components/MenuJson";
import Footer from "../components/Footer";
import favicon from "../images/favicon.ico";
import defaultTheme from "../utils/theme";

const fetchData = async () => {
  const responses = await Promise.all(
    [
      fetch("https://www2.dvrpc.org/asp/homepage/"),
      fetch("https://www2.dvrpc.org/asp/homepage/twitter.aspx?all=true"),
    ].map((p) => p.catch((e) => e))
  );
  const data = await responses[0].json();
  data.twitter = await responses[1].json();
  return data;
};

const HomePage = () => {
  const themes = [
    {
      ...defaultTheme,
      bgPrimary: "#88b3b3",
      bgImage: "https://www.dvrpc.org/img/banner/new/GettyImages-529802605.jpg",
    },
    {
      ...defaultTheme,
      bgPrimary: "#e7df8b",
      bgImage: "https://www.dvrpc.org/img/banner/new/GettyImages-820759256.jpg",
    },
    {
      ...defaultTheme,
      bgPrimary: "#b2dee7",
      bgImage: "https://www.dvrpc.org/img/banner/full/camdendelaware.jpg",
    },
    {
      ...defaultTheme,
      bgPrimary: "#dfad92",
      bgImage: "https://www.dvrpc.org/img/banner/new/GettyImages-909297366.jpg",
    },
  ];
  return (
    <ThemeProvider theme={themes[Math.floor(new Date().getHours() / 7)]}>
      <Async promiseFn={fetchData}>
        <Helmet>
          <html lang="en" />
          <link rel="icon" href={favicon} />
        </Helmet>
        <Header>
          <div tw="flex flex-col-reverse md:flex-row container m-auto justify-center items-stretch">
            <Menu data={null} />
            <article
              tw="bg-white p-4 md:mx-8 my-8 md:my-0 max-w-full"
              css={css`
                width: 80ch;
              `}
            >
              <img
                src="https://www.dvrpc.org/img/homepage/DVRPC_Regional_Map.png"
                alt="DVRPC Region"
                tw="float-left"
                css={css`
                  shape-outside: url(https://www.dvrpc.org/img/homepage/DVRPC_Regional_Map.png);
                  shape-image-threshold: 0.01;
                  width: 200px;
                  margin: 1em -18px 0 0;
                `}
              />
              <p>
                The <b>Delaware Valley Regional Planning Commission</b> is the
                federally designated Metropolitan Planning Organization for a
                diverse nine-county region in two states:{" "}
                <b>
                  Bucks, Chester, Delaware, Montgomery, and Philadelphia in
                  Pennsylvania
                </b>
                ; and{" "}
                <b>Burlington, Camden, Gloucester, and Mercer in New Jersey</b>.
              </p>
              <p>
                <b>DVRPC’s vision</b> for the Greater Philadelphia Region is a
                prosperous, innovative, equitable, resilient, and sustainable
                region that increases mobility choices by investing in a safe
                and modern transportation system; that protects and preserves
                our natural resources while creating healthy communities; and
                that fosters greater opportunities for all.
              </p>
              <p>
                <b>DVRPC’s mission</b> is to achieve this vision by convening
                the widest array of partners to inform and facilitate
                data-driven decision-making. We are engaged across the region,
                and strive to be leaders and innovators, exploring new ideas and
                creating best practices.
              </p>
            </article>
          </div>
        </Header>
        <Infobar openedTab="Announcements" />
        <div tw="bg-gray-100 py-8">
          <div tw="container flex flex-col md:flex-row mx-auto divide-x divide-gray-300">
            <div tw="flex-1 flex justify-center">
              <div tw="flex flex-col items-center text-center px-8 w-96">
                <a href="https://www.airqualitypartnership.org/">
                  <img
                    src="https://www.dvrpc.org/img/homepage/seealso/airqualitypartnership.png"
                    alt="Air Quality Partnership"
                  />
                </a>
                <p>
                  <em>
                    A public / private coalition dedicated to improving air
                    quality in the Delaware Valley through air quality
                    initiatives and advisories.
                  </em>
                </p>
              </div>
            </div>
            <div tw="flex-1 flex justify-center">
              <div tw="flex flex-col items-center text-center px-8 w-96">
                <a href="https://www.rideeco.org/">
                  <img
                    src="https://www.dvrpc.org/img/banner/new/RideECO_Logo_FINAL_PMS_3color_gradient.png"
                    alt="RideECO"
                  />
                </a>
                <p>
                  <em>
                    A commuter benefit program that employers can offer to their
                    employees to help pay for commuting on transit.
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Async>
    </ThemeProvider>
  );
};

export default HomePage;
