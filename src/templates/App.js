import React from "react";
import Async from "react-async";
import { graphql } from "gatsby";
import { ThemeProvider } from "styled-components/macro";
import defaultTheme from "../utils/theme";
import Layout from "../components/Layout";

const fetchData = async () => {
  const responses = await Promise.all(
    [
      fetch("https://www2.dvrpc.org/asp/homepage/"),
      fetch("https://www2.dvrpc.org/asp/homepage/twitter.aspx"),
    ].map((p) => p.catch((e) => e))
  );
  const data = await responses[0].json();
  data.twitter = await responses[1].json();
  return data;
};

const App = ({ data, pageContext }) => {
  return (
    <ThemeProvider theme={pageContext.theme ?? defaultTheme}>
      <Async promiseFn={fetchData}>
        <Layout
          location={data.page.path.alias}
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
  query($slug: String!, $regex: String!) {
    page: nodePage(path: { alias: { eq: $slug } }) {
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
          name
          field_display_name
          field_title
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
        }
      }
    }
  }
`;
