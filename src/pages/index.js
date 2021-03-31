import React, { useState } from "react";
import { graphql } from "gatsby";
import tw, { css } from "twin.macro";
import Async from "react-async";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components/macro";
import GlobalStyles from "../components/GlobalStyles";
import LogoBar from "../components/LogoBar";
import { RootNav } from "../components/MenuJson";
import Footer from "../components/Footer";
import favicon from "../images/favicon.ico";
import defaultTheme, { createTheme } from "../utils/theme";
import fetchData from "../utils/fetchData";
import Infobar from "../components/Infobar";
import bgImage from "../images/homepagebanner_2560.jpg";

const HomePage = ({ data }) => {
  const [max, setMax] = useState(0);
  const [activeId, setActiveId] = useState(0);
  const increment = () => setActiveId(activeId + 1 == max ? 0 : activeId + 1);
  const decrement = () => setActiveId(activeId - 1 == 0 ? max : activeId - 1);

  const alert = data.blockContentAlertBanner?.body?.processed ?? "";
  const theme = createTheme({
    ...defaultTheme,
    bgPrimary: "#0078ae",
  });
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
          <div
            tw="w-full bg-bottom pb-px"
            css={() =>
              css`
                background-image: url(${bgImage});
                background-size: cover;
                min-height: 24rem;
              `
            }
          >
            {alert.length ? (
              <div
                tw="text-white mb-4 text-center"
                css={css`
                  background-color: rgba(200, 30, 29, 0.9);
                `}
              >
                <div
                  tw="mx-auto container p-6 xl:px-0"
                  dangerouslySetInnerHTML={{ __html: alert }}
                />
              </div>
            ) : (
              ""
            )}
            <div tw="container flex flex-col mx-auto my-12">
              <form
                tw="mb-8 relative w-min-content pr-32"
                css={css`
                  background: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0.8),
                    rgba(255, 255, 255, 0.8) 18rem,
                    transparent 100%
                  );
                `}
                action="https://www2.dvrpc.org/Search/"
              >
                <div tw="w-12 h-full flex absolute items-center justify-center pointer-events-none">
                  <svg
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="presentation"
                    tw="w-8 h-8 inline-block fill-current text-gray-600 flex-shrink-0 select-none"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    <path fill="none" d="M0 0h24v24H0z" />
                  </svg>
                </div>
                <div tw="">
                  <input
                    name="q"
                    placeholder="Search..."
                    aria-label="Search"
                    tw="w-96 border-0 border-none m-0 p-2 pl-12 block bg-transparent focus:outline-none min-w-0 placeholder-gray-600"
                  />
                </div>
              </form>
              <div
                tw="w-min-content pr-32"
                css={css`
                  background: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0.8),
                    rgba(255, 255, 255, 0.8) 18rem,
                    transparent 100%
                  );
                `}
              >
                <div tw="p-4 w-96 h-40 flex items-center gap-4">
                  <div
                    tw="text-gray-400 text-3xl leading-none cursor-pointer"
                    onClick={decrement}
                  >
                    &#128896;
                  </div>
                  <Async.Fulfilled>
                    {(data) => {
                      const { components } = data.filter(
                        (d) => d.key === "anns"
                      )[0];
                      setMax(components.length);
                      return components[activeId];
                    }}
                  </Async.Fulfilled>
                  <div
                    tw="text-gray-400 text-3xl leading-none cursor-pointer"
                    onClick={increment}
                  >
                    &#128898;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <nav
          tw="flex justify-center"
          css={(props) => css`
            background-color: #296591;
            color: ${props.theme.infoColor};
          `}
        >
          <div tw="container flex-auto md:flex py-4 divide-x divide-white">
            <RootNav />
          </div>
        </nav>
        <div
          tw="flex justify-center"
          css={(props) => css`
            background-color: #bbe2f2;
          `}
        >
          <div tw="container flex-auto items-center md:flex">
            <h3>
              <a
                tw="text-3xl mr-4"
                css={css`
                  color: #296591;
                `}
                href="#"
              >
                Events
              </a>
            </h3>
            <Async.Fulfilled>
              {(data) =>
                data.filter((d) => d.key === "events")[0].components.slice(0, 4)
              }
            </Async.Fulfilled>
          </div>
        </div>

        <div
          tw="flex justify-center"
          css={(props) => css`
            background-color: #e4f5f7;
          `}
        >
          <div tw="container py-4 flex flex-col md:flex-row items-center gap-8">
            <div
              tw="md:w-3/4 border-gray-300"
              css={css`
                border-right-width: 1px;
              `}
            >
              <h3 tw="mb-4 text-3xl">
                <a
                  css={css`
                    color: #296591;
                  `}
                  href="#"
                >
                  New Releases
                </a>
              </h3>
              <div tw="flex flex-wrap">
                <Async.Fulfilled>
                  {(data) => data.filter((d) => d.key === "pubs")[0].components}
                </Async.Fulfilled>
              </div>
            </div>
            <div tw="w-full md:w-1/4">
              <h3>
                <a
                  tw="text-3xl"
                  css={css`
                    color: #296591;
                  `}
                  href="#"
                >
                  Quick Links
                </a>
              </h3>
              <ul tw="my-8">
                <li>
                  <a href="#">Business Opportunities</a>
                </li>
                <li>
                  <a href="#">Board Resources</a>
                </li>
                <li>
                  <a href="#">Committees</a>
                </li>
                <li>
                  <a href="#">Jobs at DVRPC</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
                <li>
                  <a href="#">Data</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </Async>
    </ThemeProvider>
  );
};

export default HomePage;

export const query = graphql`
  query {
    blockContentAlertBanner {
      body {
        processed
      }
    }
  }
`;
