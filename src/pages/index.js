import React from "react";
import tw, { css } from "twin.macro";
import Async from "react-async";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components/macro";
import GlobalStyles from "../components/GlobalStyles";
import LogoBar from "../components/LogoBar";
import Menu from "../components/MenuJson";
import Footer from "../components/Footer";
import favicon from "../images/favicon.ico";
import defaultTheme, { createTheme } from "../utils/theme";
import fetchData from "../utils/fetchData";
import Infobar from "../components/Infobar";

const HomePage = () => {
  const themes = [
    {
      ...defaultTheme,
      bgPrimary: "#88b3b3",
      bgImage: [
        "https://www.dvrpc.org/img/banner/new/GettyImages-529802605.jpg",
      ],
    },
    {
      ...defaultTheme,
      bgPrimary: "#e7df8b",
      bgImage: [
        "https://www.dvrpc.org/img/banner/new/GettyImages-820759256.jpg",
      ],
    },
    {
      ...defaultTheme,
      bgPrimary: "#b2dee7",
      bgImage: ["https://www.dvrpc.org/img/banner/full/camdendelaware.jpg"],
    },
    {
      ...defaultTheme,
      bgPrimary: "#dfad92",
      bgImage: [
        "https://www.dvrpc.org/img/banner/new/GettyImages-909297366.jpg",
      ],
    },
  ];
  const theme = createTheme(themes[Math.floor(new Date().getHours() / 7)]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Async promiseFn={fetchData}>
        <Helmet>
          <html lang="en" />
          <link rel="icon" href={favicon} />
          <title>Delaware Valley Regional Planning Commission</title>
          <meta
            name="description"
            content="The Delaware Valley Regional Planning Commission is the federally designated Metropolitan Planning Organization for nine counties: Bucks, Chester, Delaware, Montgomery, and Philadelphia, Pennsylvania; and Burlington, Camden, Gloucester, and Mercer, New Jersey."
          />
        </Helmet>
        <header tw="bg-white">
          <LogoBar />
          <Async.Fulfilled>
            {(data) =>
              data.alert.Text.length && (
                <div tw="bg-red-700 text-white">
                  <div
                    tw="mx-auto container p-6 xl:px-0"
                    dangerouslySetInnerHTML={{ __html: data.alert.Text }}
                  />
                </div>
              )
            }
          </Async.Fulfilled>
        </header>
        <div
          tw="w-full bg-bottom flex flex-col items-center justify-center p-8 pt-16"
          css={() =>
            css`
              background-image: url(${theme.bgImage[1]}),
                url(${theme.bgImage[0]});
              background-size: 1600px 400px, cover;
              min-height: 24rem;
            `
          }
        >
          <div tw="flex flex-col-reverse md:flex-row container m-auto justify-center items-stretch">
            <div tw="bg-white">
              <Menu data={null} />
            </div>
            <article
              tw="bg-white p-4 my-8 md:my-0 md:ml-12"
              css={css`
                max-width: 80ch;

                p {
                  ${tw`mb-4`}
                }
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
                <strong>
                  Bucks, Chester, Delaware, Montgomery, and Philadelphia in
                  Pennsylvania
                </strong>
                ; and{" "}
                <strong>
                  Burlington, Camden, Gloucester, and Mercer in New Jersey
                </strong>
                .
              </p>
              <p>
                <strong>DVRPC’s vision</strong> for the Greater Philadelphia
                Region is a prosperous, innovative, equitable, resilient, and
                sustainable region that increases mobility choices by investing
                in a safe and modern transportation system; that protects and
                preserves our natural resources while creating healthy
                communities; and that fosters greater opportunities for all.
              </p>
              <p>
                <strong>DVRPC’s mission</strong> is to achieve this vision by
                convening the widest array of partners to inform and facilitate
                data-driven decision-making. We are engaged across the region,
                and strive to be leaders and innovators, exploring new ideas and
                creating best practices.
              </p>
            </article>
          </div>
        </div>
        <Infobar openedTab="Announcements" />
        <Footer />
      </Async>
    </ThemeProvider>
  );
};

export default HomePage;
