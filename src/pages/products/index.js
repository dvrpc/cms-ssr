import React from "react";
import { graphql, navigate } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";
import Pager, { PagerProvider } from "../../components/Pager";
import Product from "../../components/Product";
import Body from "../../components/Body";

const title = "DVRPC Products";

const ProductsPage = (props) => {
  const query = new URLSearchParams(location.search).get("q") ?? "";
  const offset = new URLSearchParams(location.search).get("offset") ?? 0;
  const currentPage = offset > 0 ? Math.ceil(offset / 10) : 1;
  const provider = new PagerProvider(
    props.serverData.sort(
      (a, b) => new Date(b.DateLive) - new Date(a.DateLive)
    ),
    (pageNumber) =>
      navigate(`?q=${query}&offset=${provider.itemsPerPage * pageNumber}`),
    currentPage,
    10,
    1356
  );

  return (
    <Body title={title} menu={props.data.navItem}>
      <form action="/products/" className="my-2">
        <input
          placeholder="Search by keyword"
          name="q"
          type="search"
          defaultValue={query}
          className="appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </form>
      <Pager
        provider={provider}
        renderItem={(product) => (
          <Product
            key={product.Id}
            {...product}
            Query={query}
            Title={product.Title}
            Abstract={product.Abstract}
          />
        )}
      />
    </Body>
  );
};

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
    navItem(href: { regex: "/^/products/?$/i" }) {
      ...navitem
      links {
        ...navitem
      }
      parent {
        ...navitem
        ... on NavItem {
          links {
            ...navitem
          }
        }
      }
    }
  }
  fragment navitem on NavItem {
    href
    link
    style
    class
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
