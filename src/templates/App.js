import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

const App = ({ data }) => {
  return (
    <Layout
      location={data.page.path.alias}
      title={data.page.title}
      body={data.page.body}
      staffContact={data.page.relationships.field_staff_contact}
    />
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
