import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { graphql } from "gatsby";
import { ThemeProvider } from "@emotion/react";
import tw, { css } from "twin.macro";
import defaultTheme, { createTheme } from "../utils/theme";
import { Helmet } from "react-helmet";
import favicon from "../images/favicon.ico";
import GlobalStyles from "../components/GlobalStyles";
import LogoBar from "../components/LogoBar";
import TopNav from "../components/TopNav";
import I from "../components/Icon";
=======
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import favicon from "../images/favicon.ico";
import LogoBar from "../components/LogoBar";
import TopNav from "../components/TopNav";
import I, {
  Bikeped,
  Housing,
  Environment,
  Freight,
  Imagery,
  Planning,
  Tip,
  Region,
  Economy,
  Equity,
  Highways,
  Connections2050,
  Health,
  Transit,
  DvrpcMini,
} from "../components/Icon";
>>>>>>> 1222d49 (major updates to Gatsby 4)
import ConnectWithUs from "../components/ConnectWithUs";
import FooterAds from "../components/FooterAds";
import bgImage from "../images/datacenter.jpg";

const NewsLoader = () => <div>Loading...</div>;

const Data = ({ data }) => {
  const theme = createTheme(
    {
      ...defaultTheme,
      bgPrimary: "#0f1a3a",
      bgImage: [bgImage],
    },
    { light: "#98b8c2" }
  );
  const location = "/data";
  const title = "Data Center";
  const staffContact = {
    mail: "kkorejko@dvrpc.org",
    field_display_name: "Kim Korejko",
    field_title: "Manager, Data Coordination",
  };
  const menu = { href: location };

  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch("https://alpha.dvrpc.org/news/getTop18")
      .then((response) => response.json())
      .then((resultData) => {
        setNews(resultData.filter((r) => r.type === "New Data"));
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <html lang="en" />
        <link rel="icon" href={favicon} />
<<<<<<< HEAD
      </Helmet>
      <GlobalStyles />
      <header tw="bg-white">
        <LogoBar fillColor="rgb(0 120 174 / 75%)">
          <div tw="md:pb-2 mx-auto md:mr-0">
            <form
              tw="md:mb-4 relative md:w-min"
              css={css`
                background: linear-gradient(
=======
        <style>
          {`:root {
            --color-h1: #0f1a3a;
            --color-h2: #0f1a3a;
            --color-h3: #0f1a3a;
            --bg-cover-image: url(${bgImage});
          }`}
        </style>
      </Helmet>
      <GlobalStyles />
      <header className="bg-white">
        <LogoBar fillColor="rgb(0 120 174 / 75%)">
          <div className="md:pb-2 mx-auto md:mr-0">
            <form
              className="md:mb-4 relative md:w-min"
              style={{
                background: `linear-gradient(
>>>>>>> 1222d49 (major updates to Gatsby 4)
                  to right,
                  rgba(255, 255, 255, 0.8),
                  rgba(255, 255, 255, 0.8) 18rem,
                  transparent 100%
<<<<<<< HEAD
                );
              `}
              action="https://www.dvrpc.org/Search/"
            >
              <div tw="w-16 h-full flex absolute items-center justify-center pointer-events-none">
                <I
                  use="search"
                  fillColor="rgb(0 120 174 / 90%)"
                  tw="h-6 inline-block flex-shrink-0 select-none"
=======
                )`,
              }}
              action="https://www.dvrpc.org/Search/"
            >
              <div className="w-16 h-full flex absolute items-center justify-center pointer-events-none">
                <I
                  use="search"
                  fillColor="rgb(0 120 174 / 90%)"
                  className="h-6 inline-block flex-shrink-0 select-none"
>>>>>>> 1222d49 (major updates to Gatsby 4)
                />
              </div>
              <div>
                <input
                  name="q"
                  placeholder="Search DVRPC"
                  aria-label="Search"
<<<<<<< HEAD
                  tw="w-64 md:w-72 border rounded-lg m-0 p-2 md:pl-16 block bg-transparent focus:outline-none min-w-0 text-center md:text-left"
                  css={css`
                    border-color: hsla(199deg 100% 34% 0.5);

                    &::placeholder {
                      color: rgb(0 120 174 / 90%);
                    }
                  `}
=======
                  className="w-64 md:w-72 border rounded-lg m-0 p-2 md:pl-16 block bg-transparent focus:outline-none min-w-0 text-center md:text-left border-[#0078ae]/50 placeholder:text-[#0078AE]/90"
>>>>>>> 1222d49 (major updates to Gatsby 4)
                />
              </div>
            </form>
          </div>
        </LogoBar>
<<<<<<< HEAD
        <div
          tw="relative"
          css={css`
            height: 50vw;
            @media (min-width: 768px) {
              height: 25vw;
            }
          `}
        >
=======
        <div className="relative h-[50vw] md:h-[25vw]">
>>>>>>> 1222d49 (major updates to Gatsby 4)
          {theme.bgImage.map((bg, i) => (
            <img
              srcSet={theme.bgImage2x[i] && `${theme.bgImage2x[i]} 2x`}
              src={bg}
              alt=""
<<<<<<< HEAD
              tw="absolute md:w-full md:h-full md:object-cover md:left-0"
              css={css`
                left: -50vw;
                width: 200vw;
                max-width: unset;
              `}
=======
              className="absolute left-[-50vw] w-[200vw] md:w-full md:h-full md:object-cover md:left-0"
>>>>>>> 1222d49 (major updates to Gatsby 4)
            />
          ))}
        </div>
      </header>
      <TopNav menu={menu} />

<<<<<<< HEAD
      <div
        css={css`
          background-color: #b1d0e0;
          color: #040b1f;
        `}
      >
        <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8">
          <div tw="md:col-span-3 text-center">
            <h1 tw="font-bold text-4xl">Welcome to the DVRPC Data Center</h1>
            <p tw="text-2xl">
=======
      <div className="bg-[#b1d0e0] text-[#040b1f]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8">
          <div className="md:col-span-3 text-center">
            <h1 className="font-bold text-4xl">
              Welcome to the DVRPC Data Center
            </h1>
            <p className="text-2xl">
>>>>>>> 1222d49 (major updates to Gatsby 4)
              where you have access to information about the Greater
              <br />
              Philadelphia region at your fingertips!
            </p>
            <form
              action="http://data.dvrpc.org/dataset/"
              method="GET"
<<<<<<< HEAD
              tw="w-full md:w-2/3 inline-block relative"
=======
              className="w-full md:w-2/3 inline-block relative"
>>>>>>> 1222d49 (major updates to Gatsby 4)
            >
              <input
                type="search"
                name="q"
                autoFocus
                placeholder="SEARCH DATA CATALOG OR EXPLORE BELOW"
<<<<<<< HEAD
                tw="hidden md:block p-6 pl-20 mt-8 rounded-lg text-xl leading-none w-full"
                css={css`
                  outline: 2px solid #030a18;

                  &::placeholder {
                    color: #030a18;
                    text-align: center;
                    font-weight: bolder;
                    font-size: 1.2rem;
                    letter-spacing: 0.05rem;
                  }
                `}
=======
                className="hidden md:block p-6 pl-20 mt-8 rounded-lg text-xl leading-none w-full outline-2 outline-[#030a18] placeholder:text-[#030a18]/90 placeholder:text-center placeholder:font-extrabold placeholder:text-lg placeholder:tracking-wider"
>>>>>>> 1222d49 (major updates to Gatsby 4)
              />
              <input
                type="search"
                name="q"
                autoFocus
                placeholder="SEARCH DATA"
<<<<<<< HEAD
                tw="md:hidden p-6 mt-8 rounded-lg text-xl leading-none w-full"
                css={css`
                  outline: 2px solid #030a18;

                  &::placeholder {
                    color: #030a18;
                    text-align: center;
                    font-weight: bolder;
                    font-size: 1.2rem;
                    letter-spacing: 0.05rem;
                  }
                `}
              />
              <button
                tw="hidden md:block text-3xl font-bold absolute left-8 top-1/2 leading-none"
                css={css`
                  color: #030a18;
                  transform: scale(-1, 1);
                `}
              >
=======
                className="md:hidden p-6 mt-8 rounded-lg text-xl leading-none w-full outline-2 outline-[#030a18] placeholder:text-[#030a18]/90 placeholder:text-center placeholder:font-extrabold placeholder:text-lg placeholder:tracking-wider"
              />
              <button className="hidden md:block text-3xl font-bold absolute left-8 top-1/2 leading-none color-[#030a18] -scale-x-100">
>>>>>>> 1222d49 (major updates to Gatsby 4)
                ⌕
              </button>
            </form>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div
        css={css`
          background-color: #b1d0e0;
          color: #040b1f;
        `}
      >
        <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-4 font-bold text-sm">
          <div tw="md:col-span-3 text-center">
            <div tw="md:grid grid-cols-2 md:grid-cols-7">
              {Object.entries({
                "Bicycle+%26+Pedestrian": "bikeped",
                "Demographics+%26+Housing": "housing",
                Environment: "environment",
                "Freight+%26+Aviation": "freight",
                Imagery: "imagery",
                Planning: "planning",
                TIP: "tip",
                Boundaries: "region",
                Economy: "economy",
                "Equity+%26+Diversity": "equity",
                Highway: "highways",
                "Long-Range+Plan": "connections2050",
                "Safety+%26+Health": "health",
                Transit: "transit",
              }).map(([category, icon]) => (
                <div key={category} tw="my-4">
                  <a
                    tw="no-underline hover:underline uppercase"
                    href={`https://data.dvrpc.org/dataset/?category=${category}`}
                    target="_blank"
                  >
                    <I
                      use={icon}
                      fillColor="#040b1f"
                      tw="mx-auto w-16 h-16 mb-2"
=======
      <div className="bg-[#b1d0e0] text-[#040b1f]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-4 font-bold text-sm">
          <div className="md:col-span-3 text-center">
            <div className="md:grid grid-cols-2 md:grid-cols-7">
              {Object.entries({
                "Bicycle+%26+Pedestrian": Bikeped,
                "Demographics+%26+Housing": Housing,
                Environment: Environment,
                "Freight+%26+Aviation": Freight,
                Imagery: Imagery,
                Planning: Planning,
                TIP: Tip,
                Boundaries: Region,
                Economy: Economy,
                "Equity+%26+Diversity": Equity,
                Highway: Highways,
                "Long-Range+Plan": Connections2050,
                "Safety+%26+Health": Health,
                Transit: Transit,
              }).map(([category, icon]) => (
                <div key={category} className="my-4">
                  <a
                    className="no-underline hover:underline uppercase"
                    href={`https://data.dvrpc.org/dataset/?category=${category}`}
                    target="_blank"
                  >
                    <Icon
                      use={icon}
                      fillColor="#040b1f"
                      className="mx-auto w-16 h-16 mb-2"
>>>>>>> 1222d49 (major updates to Gatsby 4)
                    />
                    {decodeURIComponent(category).replaceAll("+", " ")}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div
        css={css`
          background-color: #eee;
          color: #030a18;
        `}
      >
        <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8 pb-0">
          <div tw="md:col-span-3">
            <h2 tw="font-bold text-2xl text-center">FEATURED APPS</h2>
            <div
              tw="md:grid grid-cols-3 items-start justify-between mt-8 md:divide-x divide-gray-300"
              css={css`
                color: #155575;
              `}
            >
=======
      <div className="bg-gray-200 color-[#030a18]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8 pb-0">
          <div className="md:col-span-3">
            <h2 className="font-bold text-2xl text-center">FEATURED APPS</h2>
            <div className="md:grid grid-cols-3 items-start justify-between mt-8 md:divide-x divide-gray-300 text-[#155575]">
>>>>>>> 1222d49 (major updates to Gatsby 4)
              {data.allMenuLinkContentMenuLinkContent.edges
                .slice(0, 3)
                .map(({ node }) => {
                  const id = node.link.uri.replace("internal:/", "");
                  return (
                    <div
<<<<<<< HEAD
                      tw="my-4 md:m-0 px-8 text-lg leading-tight flex items-center"
                      key={id}
                    >
                      <a
                        tw="flex-none"
                        href={`https://www.dvrpc.org/Products/${id}`}
                      >
                        <img
                          tw="float-left w-20 md:w-40 mr-4"
=======
                      className="my-4 md:m-0 px-8 text-lg leading-tight flex items-center"
                      key={id}
                    >
                      <a
                        className="flex-none"
                        href={`https://www.dvrpc.org/Products/${id}`}
                      >
                        <img
                          className="float-left w-20 md:w-40 mr-4"
>>>>>>> 1222d49 (major updates to Gatsby 4)
                          src={`https://www.dvrpc.org/asp/pubs/201px/${id}.png`}
                        />
                      </a>
                      <h2>
                        <a href={`https://www.dvrpc.org/products/${id}`}>
                          {node.title}
                        </a>
                      </h2>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div
        css={css`
          background-color: #eee;
          color: #030a18;
        `}
      >
        <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8">
          <div tw="md:col-span-3">
            <h2 tw="font-bold text-2xl text-center">WHAT'S NEW</h2>
            <div
              tw="md:grid grid-cols-3 items-start justify-between mt-8 md:divide-x divide-gray-300"
              css={css`
                color: #155575;
              `}
            >
              {news.slice(0, 3).map(({ id, img, title }) => {
                return (
                  <div
                    tw="my-4 md:m-0 px-8 text-lg leading-tight flex items-center"
                    key={id}
                  >
                    <img
                      tw="float-left flex-none w-20 md:w-32 mr-4"
=======
      <div className="bg-[#eee] color-[#030a18]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8">
          <div className="md:col-span-3">
            <h2 className="font-bold text-2xl text-center">WHAT'S NEW</h2>
            <div className="md:grid grid-cols-3 items-start justify-between mt-8 md:divide-x divide-gray-300 color-[#155575]">
              {news.slice(0, 3).map(({ id, img, title }) => {
                return (
                  <div
                    className="my-4 md:m-0 px-8 text-lg leading-tight flex items-center"
                    key={id}
                  >
                    <img
                      className="float-left flex-none w-20 md:w-32 mr-4"
>>>>>>> 1222d49 (major updates to Gatsby 4)
                      src={img}
                    />
                    <h2>
                      <a
                        href={`https://www.dvrpc.org/news/?post=${id}#filter-wrapper`}
                      >
                        {title}
                      </a>
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <div
        css={css`
          color: #030a18;
          background: #99c5c8;
        `}
      >
        <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8 pb-4 md:pb-8">
          <div tw="md:col-span-3 text-center">
            <h2 tw="font-bold text-2xl">
              ABOUT THE GREATER PHILADELPHIA REGION
            </h2>
            <div
              tw="md:grid md:grid-cols-4 items-stretch justify-between text-xl mt-4 md:mt-8 md:divide-x divide-y md:divide-y-0"
              css={css`
                color: #155575;
              `}
            >
=======
      <div className="color-[#030a18] bg-[#99c5c8]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8 pb-4 md:pb-8">
          <div className="md:col-span-3 text-center">
            <h2 className="font-bold text-2xl">
              ABOUT THE GREATER PHILADELPHIA REGION
            </h2>
            <div className="md:grid md:grid-cols-4 items-stretch justify-between text-xl mt-4 md:mt-8 md:divide-x divide-y md:divide-y-0 text-[#155575]">
>>>>>>> 1222d49 (major updates to Gatsby 4)
              {[
                ["5,893,110", "TOTAL POPULATION"],
                [
                  "370",
                  "MILLION MILES",
                  <>
                    of <strong>UNLINKED TRANSIT TRIPS</strong> per year
                  </>,
                ],
                [
                  "592,000",
                  "ACRES",
                  <>
                    of <strong>PROTECTED LAND</strong>
                  </>,
                ],
                [
                  "23,000",
                  "MILES",
                  <>
                    of <strong>ROADS</strong>
                  </>,
                ],
              ].map(([figure, line1, line2]) => (
<<<<<<< HEAD
                <div
                  tw="my-4 md:my-0 pt-4 md:pt-0 px-4"
                  css={css`
                    border-color: #030a18;
                  `}
                >
                  <h3
                    tw="text-3xl font-bold mb-2"
                    css={css`
                      color: #030a18;
                    `}
                  >
                    {figure}
                  </h3>
                  <div tw="font-normal text-xl">{line1}</div>
=======
                <div className="my-4 md:my-0 pt-4 md:pt-0 px-4 border-[#030a18]">
                  <h3 className="text-3xl font-bold mb-2 text-[#030a18]">
                    {figure}
                  </h3>
                  <div className="font-normal text-xl">{line1}</div>
>>>>>>> 1222d49 (major updates to Gatsby 4)
                  {line2}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <footer tw="flex justify-center bg-white">
        <div tw="container">
=======
      <footer className="flex justify-center bg-white">
        <div className="container">
>>>>>>> 1222d49 (major updates to Gatsby 4)
          <FooterAds />
        </div>
      </footer>

<<<<<<< HEAD
      <div
        tw="flex justify-center text-center md:text-left"
        css={css`
          color: #99c5c8;
          background-color: #030a18;
        `}
      >
        <div tw="container">
          <div tw="mt-4 md:flex justify-between">
            <footer tw="md:py-4 flow-root">
              <a href={`mailto:${staffContact.mail}`} tw="font-bold">
                {staffContact.field_display_name}
              </a>{" "}
              <small tw="text-sm">{staffContact.field_title}</small>
=======
      <div className="flex justify-center text-center md:text-left text-[#99c5c8] bg-[#030a18]">
        <div className="container">
          <div className="mt-4 md:flex justify-between">
            <footer className="md:py-4 flow-root">
              <a href={`mailto:${staffContact.mail}`} className="font-bold">
                {staffContact.field_display_name}
              </a>{" "}
              <small className="text-sm">{staffContact.field_title}</small>
>>>>>>> 1222d49 (major updates to Gatsby 4)
            </footer>
            <ConnectWithUs
              title={title}
              location={`https://www.dvrpc.org${location}`}
              fillColor="#99c5c8"
            />
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <footer
        tw="flex justify-center -mt-1"
        css={css`
          color: #99c5c8;
          background-color: #030a18;
        `}
      >
        <div tw="container text-center md:text-left">
          <div tw="mb-4 md:flex justify-between">
            <div tw="leading-none">
              <a href="/" tw="no-underline">
                <I
                  use="dvrpcMini"
                  tw="mx-auto md:mx-0 h-8"
                  fillColor="#99C5C8"
                />
              </a>
=======
      <footer className="flex justify-center -mt-1 color-[#99c5c8] bg-[#030a18]">
        <div className="container text-center md:text-left">
          <div className="mb-4 md:flex justify-between">
            <div className="leading-none">
              <Link to="/" className="no-underline">
                <Icon
                  use={DvrpcMini}
                  className="mx-auto md:mx-0 h-8"
                  fillColor="#99C5C8"
                />
              </Link>
>>>>>>> 1222d49 (major updates to Gatsby 4)
              <small>
                190 N Independence Mall West, 8th Floor
                <br />
                Philadelphia, PA 19106-1520
                <br />
                215.592.1800
              </small>
            </div>
<<<<<<< HEAD
            <small tw="mt-4 md:m-0 self-end">
              <a href="/Policies/">Policies</a> |{" "}
=======
            <small className="mt-4 md:m-0 self-end">
              <Link to="/Policies/">Policies</Link> |{" "}
>>>>>>> 1222d49 (major updates to Gatsby 4)
              <a
                href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
                rel="noopener"
              >
                Sign Up for Our Email Lists
              </a>
            </small>
          </div>
        </div>
      </footer>
    </ThemeProvider>
  );
};

export default Data;

export const query = graphql`
  query {
    allMenuLinkContentMenuLinkContent(
      filter: {
        menu_name: { eq: "data-center-featured-apps" }
        enabled: { eq: true }
      }
      sort: { fields: weight }
    ) {
      edges {
        node {
          title
          link {
            uri
          }
        }
      }
    }
  }
`;
