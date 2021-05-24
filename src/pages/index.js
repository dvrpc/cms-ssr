import React, { useState, Suspense } from "react";
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
import Icon from "../components/Icon";
import bgImage from "../images/homepagebanner_2560.jpg";
import { useAsyncResource } from "use-async-resource";
import Announcement, { AnnouncementLoader } from "../components/Announcement";
import Event, { EventLoader } from "../components/Event";
import Product, { ProductLoader } from "../components/Product";
import fetch from "cross-fetch";

const fetchData = () =>
  fetch(`https://www.dvrpc.org/asp/homepage/default2.aspx`).then((r) =>
    r.json()
  );

const Anns = (props) => {
  const data = props.dataReader();
  props.setMax(data.anns.length);
  return (
    <div>
      {data.anns.map((d, index) => (
        <Announcement
          key={d.guid["#text"]}
          active={props.activeId === index}
          {...d}
        />
      ))}
    </div>
  );
};

const Events = (props) => {
  const data = props.dataReader();
  return data.events
    .slice(0, 4)
    .map((d) => <Event key={d.StartDate + d.StartTime} {...d} />);
};

const Products = (props) => {
  const data = props.dataReader();
  return data.pubs.map((d) => <Product key={d.PubId} {...d} />);
};

const HomePage = ({ data }) => {
  const isSSR = typeof window === "undefined";
  const [dataReader, getNewData] = useAsyncResource(fetchData, []);
  const [max, setMax] = useState(0);
  const [activeId, setActiveId] = useState(0);
  const increment = () => setActiveId(activeId + 1 === max ? 0 : activeId + 1);
  const decrement = () =>
    setActiveId(activeId - 1 === -1 ? max - 1 : activeId - 1);

  const alert = data.blockContentAlertBanner?.body?.processed ?? "";
  const theme = createTheme({
    ...defaultTheme,
    bgPrimary: "#0078ae",
  });
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
              tw="text-white text-center"
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
              action="https://www.dvrpc.org/Search/"
            >
              <div tw="w-12 h-full flex absolute items-center justify-center pointer-events-none">
                <Icon
                  use="search"
                  fillColor="#6d6d6d"
                  tw="h-6 inline-block flex-shrink-0 select-none"
                />
              </div>
              <div>
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
                  <Icon use="leftarrow" fillColor="#6d6d6d" tw="h-10" />
                </div>
                {!isSSR && (
                  <Suspense fallback={<AnnouncementLoader />}>
                    <Anns
                      setMax={setMax}
                      activeId={activeId}
                      dataReader={dataReader}
                    />
                  </Suspense>
                )}
                <div
                  tw="text-gray-400 text-3xl leading-none cursor-pointer"
                  onClick={increment}
                >
                  <Icon use="rightarrow" fillColor="#6d6d6d" tw="h-10" />
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
        <div tw="container flex-auto items-center justify-between md:flex">
          <h3>
            <a
              tw="text-3xl mr-4"
              css={css`
                color: #296591;
              `}
              href="https://www.dvrpc.org/Calendar/"
            >
              Events
            </a>
          </h3>
          {!isSSR && (
            <Suspense
              fallback={[...Array(4)].map(() => (
                <EventLoader />
              ))}
            >
              <Events dataReader={dataReader} />
            </Suspense>
          )}
        </div>
      </div>

      <div
        tw="flex justify-center"
        css={(props) => css`
          background-color: #e4f5f7;
        `}
      >
        <div tw="container py-4 flex flex-col md:flex-row items-center gap-12">
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
                href="https://www.dvrpc.org/Products/Search/"
              >
                New Releases
              </a>
            </h3>
            <div tw="flex flex-wrap">
              {!isSSR && (
                <Suspense
                  fallback={[...Array(6)].map(() => (
                    <ProductLoader />
                  ))}
                >
                  <Products dataReader={dataReader} />
                </Suspense>
              )}
            </div>
          </div>
          <div tw="w-full md:w-1/4">
            <h3
              tw="text-3xl"
              css={css`
                color: #296591;
              `}
            >
              Quick Links
            </h3>
            <ul tw="my-8">
              <li>
                <a href="https://www.dvrpc.org/business">
                  Business Opportunities
                </a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/committees/board">
                  Board Resources
                </a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/committees/">Committees</a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/humanresources">Jobs at DVRPC</a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/news">News</a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/dataproducts">Data</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
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
