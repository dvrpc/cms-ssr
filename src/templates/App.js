import React from "react";
import Async from "react-async";
import { graphql } from "gatsby";
import { ThemeProvider } from "styled-components/macro";
import defaultTheme from "../utils/theme";
import fetchData from "../utils/fetchData";
import Layout from "../components/Layout";
import color from "color";

const App = ({ data, pageContext }) => {
  const theme = {
    ...defaultTheme,
    h1: data.page.relationships.field_theme.field_primary_color,
    h2: color(data.page.relationships.field_theme.field_primary_color).lighten(
      0.1
    ),
    h3: color(data.page.relationships.field_theme.field_primary_color).lighten(
      0.2
    ),
    bgPrimary: data.page.relationships.field_theme.field_secondary_color,
    bgImage: data.page.relationships.field_theme.relationships.field_banner.map(
      (i) => `https://cms.dvrpc.org/${i.uri.url}`
    ),
    bgCredits: data.page.relationships.field_theme.field_photo_credits || "",
  };
  return (
    <ThemeProvider theme={theme}>
      <Async promiseFn={fetchData}>
        <Layout
          location={pageContext.slug || pageContext.guid}
          title={data.page.title}
          body={data.page.body}
          staffContact={data.page.relationships.field_staff_contact}
          menu={data.navItem}
        />
      </Async>
    </ThemeProvider>
  );
};

export default App;

export const query = graphql`
  query($slug: String, $guid: String, $regex: String!) {
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
          relationships {
            user_picture {
              uri {
                value
              }
            }
          }
        }
        field_theme {
          field_primary_color
          field_secondary_color
          field_photo_credits
          relationships {
            field_banner {
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
            }
          }
        }
      }
    }
  }
`;
