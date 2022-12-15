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
              <h1>Media Releases</h1>
              <article>
                <p>
                  DVRPC regularly issues media releases to approximately 300
                  electronic and press outlets throughout the Delaware Valley on
                  a variety of projects and issues. Requests for more
                  information should be directed to the Office of Communications
                  and Engagement.
                </p>
                <h2>2022</h2>
                <ul className="list-group">
                  {data.taxonomyTermTags.relationships.node__article.map(
                    (p) => {
                      const [, monthIndex, day] = p.created.split("T")[0].split("-");
                      return (
                        <li>
                          <div tw="flex">
                            <div tw="text-xl mr-4 flex-shrink-0">
                              {month[monthIndex]} {day}
                            </div>
                            <a href={p.path.alias}>{p.title}</a>
                          </div>
                        </li>
                      );
                    }
                  )}
                </ul>
                <h2>
                  <a href="/news/mediareleases/archive">Archive</a>
                </h2>
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
    taxonomyTermTags(name: { eq: "media release" }) {
      relationships {
        node__article {
          title
          created
          path {
            alias
          }
          body {
            processed
            summary
          }
        }
      }
    }
  }
`;
