import React from "react";
import { graphql } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";
import ProductsListView from "../../components/ProductsListView";

const title = "DVRPC Products";

const ProductsPage = (props) => (
  <ProductsListView {...props} title={title}>
    <p>
      DVRPC has published over one thousand reports from the 1970s to present.
      Product abstracts and/or PDF downloads are available.
    </p>
  </ProductsListView>
);

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary:
      "DVRPC has published over one thousand reports from the 1970s to present. Product abstracts and/or PDF downloads are available. You can also see a quick list of recent products published.",
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "ahastings@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    nodeTheme(id: { eq: "0efb8b9d-ee32-58c6-897d-0a50ae2b5ac4" }) {
      field_primary_color
      field_secondary_color
      field_third_color
      field_photo_credits
      relationships {
        field_banner_2x {
          uri {
            url
          }
        }
        field_banner {
          uri {
            url
          }
        }
      }
    }
  }
`;

export default ProductsPage;

export async function getServerData({ query }) {
  try {
    let url = "https://www.dvrpc.org/api/products?onlyFeatured=false";
    if (query.q) url += `&keywords=${query.q}`;
    if (query.offset) url += `&offset=${query.offset}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Response failed");
    }

    return {
      props: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
