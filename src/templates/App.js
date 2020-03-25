import React from "react";
import { graphql } from "gatsby";
import { ThemeProvider } from "styled-components/macro";
import Layout from "../components/Layout";

const defaultTheme = {
  h1: "#0078ae",
  h2: "#2d799a",
  h3: "#4b6a77",
  bgPrimary: "#e7df8b",
  bgImage: "https://www.dvrpc.org/img/banner/full/philly1.jpg"
};

const App = ({ data, pageContext }) => {
  return (
    <ThemeProvider theme={pageContext.theme ?? defaultTheme}>
      <Layout
        location={data.page.path.alias}
        title={data.page.title}
        body={data.page.body}
        staffContact={data.page.relationships.field_staff_contact}
      />
    </ThemeProvider>
  );
};

export default App;

export const query = graphql`
  query($slug: String!) {
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
  }
`;
