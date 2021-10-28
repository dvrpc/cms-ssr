import React from "react";
import { graphql } from "gatsby";
import { ThemeProvider } from "@emotion/react";
import defaultTheme, { createTheme } from "../utils/theme";
import Layout from "../components/Layout";
import color from "color";

const App = ({ data, pageContext }) => {
  const theme = createTheme({
    ...defaultTheme,
    h1: data.page.relationships.field_theme.field_primary_color,
    h2: color(data.page.relationships.field_theme.field_primary_color)
      .lighten(0.1)
      .hex(),
    h3: color(data.page.relationships.field_theme.field_primary_color)
      .lighten(0.1)
      .hex(),
    bgPrimary: data.page.relationships.field_theme.field_secondary_color,
    bgNav:
      data.page.relationships.field_theme.field_third_color ||
      data.page.relationships.field_theme.field_secondary_color,
    bgImage: data.page.relationships.field_theme.relationships.field_banner.map(
      (i) => `https://cms.dvrpc.org${i.uri.url}`
    ),
    bgImage2x:
      data.page.relationships.field_theme.relationships.field_banner_2x.map(
        (i) => `https://cms.dvrpc.org${i.uri.url}`
      ),
    bgCredits: data.page.relationships.field_theme.field_photo_credits || "",
  });
  return (
    <ThemeProvider theme={theme}>
      <Layout
        location={pageContext.slug || pageContext.guid}
        title={data.page.title}
        body={data.page.body}
        staffContact={data.page.relationships.field_staff_contact}
        menu={data.navItem}
      />
    </ThemeProvider>
  );
};

export default App;

export const query = graphql`
  query ($slug: String, $guid: String, $regex: String!) {
    page: nodePage(drupal_id: { eq: $guid }, path: { alias: { eq: $slug } }) {
      title
      path {
        alias
      }
      body {
        processed
        summary
      }
      relationships {
        field_staff_contact {
          mail
          field_display_name
          field_title
        }
        field_theme {
          field_primary_color
          field_secondary_color
          field_third_color
          field_photo_credits
          relationships {
            field_banner {
              uri {
                url
              }
            }
            field_banner_2x {
              uri {
                url
              }
            }
          }
        }
      }
    }
    navItem(href: { regex: $regex }) {
      href
      link
      style
      class
      links {
        href
        link
        style
        class
      }
      parent {
        ... on NavItem {
          href
          link
          style
          class
          links {
            href
            link
            style
            class
          }
          parent {
            ... on NavItem {
              href
              link
              style
              class
              links {
                href
                link
                style
                class
              }
              parent {
                ... on NavItem {
                  href
                  link
                  style
                  class
                  links {
                    href
                    link
                    style
                    class
                  }
                  parent {
                    ... on NavItem {
                      href
                      link
                      style
                      class
                      links {
                        href
                        link
                        style
                        class
                      }
                      parent {
                        ... on NavItem {
                          href
                          link
                          style
                          class
                          links {
                            href
                            link
                            style
                            class
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
