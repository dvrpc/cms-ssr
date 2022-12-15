import React from "react";
import { graphql } from "gatsby";
import tw, { css } from "twin.macro";
import { ThemeProvider } from "@emotion/react";
import defaultTheme, { createTheme } from "../../utils/theme";
import Layout from "../../components/Layout";
import { styles } from "../../components/Main";
import color from "color";
import MenuJson from "../../components/MenuJson";
import InfoLinks from "../../components/InfoLinks";

const month = {
  "01": "JAN",
  "02": "FEB",
  "03": "MAR",
  "04": "APR",
  "05": "MAY",
  "06": "JUN",
  "07": "JUL",
  "08": "AUG",
  "09": "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC",
};

const MediaReleases = ({ data }) => {
  const theme = createTheme({
    ...defaultTheme,
    h1: "#0078ae",
    h2: color("#0078ae").lighten(0.1).hex(),
    h3: color("#0078ae").lighten(0.1).hex(),
    bgPrimary: "#0078ae",
    bgNav: "#0078ae",
    bgImage: ["https://www.dvrpc.org/img/banner/full/newsroom_banner.png"],
    bgImage2x: [],
    bgCredits: "",
  });
  return (
    <ThemeProvider theme={theme}>
      <Layout
        location="/news/mediareleases"
        title="Media Releases"
        staffContact={{
          mail: "eturner@dvrpc.org",
          field_display_name: "Elise Turner",
          field_title: "Manager, Office of Communications and Engagement",
        }}
      >
        <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12">
          <div tw="md:order-2 md:col-span-2">
            <main css={styles}>
              <h1>News</h1>
              <article>
                <p>
                  DVRPC proudly serves as a resource for the region's media,
                  sharing information about our work to improve mobility, the
                  environment, and quality-of-life in Greater Philadelphia. For
                  more information, or to speak with a subject matter expert,
                  contact Elise Turner, Communications Manager, at 215-238-2941.
                </p>
                <ul className="flex flex-wrap flex-col list-none">
                  {data.allNodeArticle?.nodes.map((p) => {
                    const [, m, day] = p.created
                      .split("T")[0]
                      .split("-");
                    return (
                      <li tw="flex-1 w-1/3 list-none">
                        <div tw="flex">
                          <img src={p.relationships.field_image.uri.url} />
                          <div tw="italic mr-4 flex-shrink-0">
                            {month[m]} {day}
                          </div>
                          <a href={p.path.alias}>
                            {p.title}
                          </a>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <h2>
                  <a href="">Media Releases</a>
                </h2>
                <p>View recent media releases.</p>
                <h2>
                  <a href="">DVRPC Newsletter</a>
                </h2>
                <p>
                  The monthly newsletter highlights the Commission’s latest
                  reports, new programs, and events.
                </p>
                <h2>
                  <a href="">Annual Report</a>
                </h2>
                <p>
                  The DVRPC Annual Report summarizes the accomplishments of the
                  Commission and staff during the previous fiscal year.
                </p>
                <h2>
                  <a href="">Photos and Logos</a>
                </h2>
                <p>
                  Download leadership portraits, DVRPC's logo specifications and
                  logos.
                </p>
              </article>
            </main>
          </div>
          <div tw="md:order-1 md:col-span-1 md:mt-20 flex flex-col md:items-end">
            <MenuJson data={{}} />
            <InfoLinks />
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export default MediaReleases;

export const query = graphql`
  {
    allNodeArticle(
      filter: {
        relationships: {
          field_tags: { elemMatch: { name: { ne: "media release" } } }
        }
      }
    ) {
      nodes {
        title
        created
        path {
          alias
        }
        body {
          processed
          summary
        }
        relationships {
          field_image {
            uri {
              url
            }
          }
          field_tags {
            name
          }
        }
      }
    }
  }
`;
