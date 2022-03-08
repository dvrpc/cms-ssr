import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { ThemeProvider } from "@emotion/react";
import tw, { css } from "twin.macro";
import defaultTheme, { createTheme } from "../utils/theme";
import Layout from "../components/Layout";
import I from "../components/Icon";
import bgImage from "../images/datacenter.jpg";

const NewsLoader = () => <div>Loading...</div>;

const Data = ({ data }) => {
  const theme = createTheme({
    ...defaultTheme,
    bgPrimary: "#0f1a3a",
    bgImage: [bgImage],
  });
  const location = "/data";
  const title = "Data Center";
  const staffContact = {
    mail: "kkorejko@dvrpc.org",
    field_display_name: "Kim Korejko",
    field_title: "Manager, Data Coordination",
  };

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
      <Layout
        location={location}
        title={title}
        staffContact={staffContact}
        menu={{}}
      >
        <div
          css={css`
            background-color: #98b8c2;
            color: #030a18;
          `}
        >
          <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-12">
            <div tw="md:col-span-3 text-center">
              <h1 tw="font-bold text-3xl leading-none">
                Welcome to the DVRPC Data Center
              </h1>
              <p>
                where you have access to information about the Greater
                <br />
                Philadelphia region at your fingertips!
              </p>
              <form action="http://data2.dvrpc.org/dataset/" method="GET">
                <input
                  type="search"
                  name="q"
                  placeholder="SEARCH DATA CATALOG OR EXPLORE BELOW"
                  tw="mt-8 p-4 w-1/2 leading-none"
                  css={css`
                    &::placeholder {
                      color: #030a18;
                      text-align: center;
                      font-weight: bold;
                      font-size: 1.1rem;
                    }
                  `}
                />
              </form>
            </div>
          </div>
        </div>
        <div
          tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8"
          css={css`
            color: #155575;
          `}
        >
          <div tw="md:col-span-3 text-center">
            <div tw="grid grid-cols-7">
              {Object.entries({
                "BICYCLE & PEDESTRIAN": "connections2050",
                "DEMOGRAPHICS & HOUSING": "connections2050",
                ENVIRONMENT: "connections2050",
                "FREIGHT & AVIATION": "connections2050",
                IMAGERY: "connections2050",
                PLANNING: "connections2050",
                TIP: "connections2050",
                BOUNDARIES: "connections2050",
                ECONOMY: "connections2050",
                "EQUITY & DIVERSITY": "connections2050",
                HIGHWAY: "connections2050",
                "LONG RANGE PLAN": "connections2050",
                "SAFETY & HEALTH": "connections2050",
                TRANSIT: "connections2050",
              }).map(([name, icon]) => (
                <div key={name} tw="flex items-center flex-col my-8">
                  <a href={`#${name}`}>
                    <I use={icon} tw="w-16 h-16" />
                  </a>
                  <a href={`#${name}`}>{name}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          css={css`
            background-color: #eee;
            color: #030a18;
          `}
        >
          <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8">
            <div tw="md:col-span-3">
              <h2 tw="font-bold text-2xl text-center">FEATURED APPS</h2>
              <div tw="grid grid-cols-3 items-stretch justify-between mt-8">
                {data.allMenuLinkContentMenuLinkContent.edges
                  .slice(0, 3)
                  .map(({ node }) => {
                    const id = node.link.uri.replace("internal:/", "");
                    return (
                      <div
                        tw="px-8 text-xl"
                        css={css`
                          border-right: 1px solid #9e9e9e;
                        `}
                        key={id}
                      >
                        <a href={`https://www.dvrpc.org/Products/${id}`}>
                          <img
                            tw="float-left w-40 mr-4"
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
        <div
          css={css`
            background-color: #eee;
            color: #030a18;
          `}
        >
          <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8">
            <div tw="md:col-span-3">
              <h2 tw="font-bold text-2xl text-center">WHAT'S NEW</h2>
              <div tw="grid grid-cols-3 items-stretch justify-between mt-8">
                {news.slice(0, 3).map((item) => {
                  return (
                    <div
                      tw="px-8 text-xl"
                      css={css`
                        border-right: 1px solid #9e9e9e;
                      `}
                      key={item.id}
                    >
                      <img tw="float-left w-32 mr-4" src={item.img} />
                      <h2>
                        <a
                          href={`https://www.dvrpc.org/news/?post=${item.id}#filter-wrapper`}
                        >
                          {item.title}
                        </a>
                      </h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          css={css`
            background-color: #98b8c2;
            color: #030a18;
          `}
        >
          <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8">
            <div tw="md:col-span-3 text-center">
              <h2 tw="font-bold text-2xl">QUICK STATS</h2>
              <p tw="text-2xl">about the Greater Philadelphia region</p>
              <div
                tw="grid grid-cols-4 items-stretch justify-between text-xl mt-8"
                css={css`
                  & div {
                    padding: 0 1rem;
                    border-right: 1px solid #030a18;
                  }

                  & div:last-of-type {
                    border: none;
                  }

                  & h3 {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                  }
                  & b {
                    font-weight: normal;
                    font-size: 1.5rem;
                    display: block;
                  }
                `}
              >
                <div>
                  <h3>5,893,110</h3>
                  <b>TOTAL POPULATION</b>
                </div>
                <div>
                  <h3>370</h3>
                  <b>MILLION MILES</b>
                  of <strong>UNLINKED TRANSIT TRIPS</strong> per year
                </div>
                <div>
                  <h3>592,000</h3>
                  <b>ACRES</b> of <strong>PROTECTED LAND</strong>
                </div>
                <div>
                  <h3>23,000</h3>
                  <b>MILES</b> of <strong>ROADS</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
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
