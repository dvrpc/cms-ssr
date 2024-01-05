import React from "react";
import { graphql, Link } from "gatsby";

import Body from "../../components/Body";
import HeadTemplate from "../../components/HeadTemplate";
import StaffContact from "../../components/StaffContact";

const title = "Media Releases";

const themeConfig = [
  ["field_primary_color", "--color-h1"],
  ["field_primary_color", "--color-h2"],
  ["field_primary_color", "--color-h3"],
  ["field_secondary_color", "--color-highlight"],
  [
    "relationships.field_banner",
    "--bg-cover-image",
    (val) =>
      val
        .map(
          (obj) => obj.uri?.url && `url(https://cdn.dvrpc.org${obj.uri?.url})`
        )
        .reverse()
        .join(", "),
  ],
  [
    "relationships.field_banner_2x",
    "--bg-cover-image",
    (val) =>
      val
        .map(
          (obj) => obj.uri?.url && `url(https://cdn.dvrpc.org${obj.uri?.url})`
        )
        .reverse()
        .join(", "),
  ],
  [
    "field_photo_credits",
    "--content-photo-credits",
    (val) => (val ? `"${val}"` : `""`),
  ],
  ["relationships.field_banner", "--height-banner", () => "400px"],
];

const themeToCustomVars = (theme, config) => {
  return config
    .map(([key, customVar, parseFunc = (v) => v]) => {
      const val = key
        .split(".")
        .reduce((prev, cur) => prev && prev[cur], theme);
      return parseFunc(val) ? `${customVar}: ${parseFunc(val)};` : null;
    })
    .join("\n");
};

const Article = ({ node }) => (
  <li className="list-group-item">
    <div className="pb-6">
      <div className="text-sm text-gray-500">
        {new Date(node.created)
          .toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
          .toUpperCase()}
      </div>

      <Link className="text-xl no-underline" to={node.path.alias}>
        {node.title}
      </Link>
    </div>
  </li>
);

const DrupalPage = ({ data, path }) => {
  const { allNodeArticle, userUser, navItem } = data;
  return (
    <>
      <Body title={title} menu={navItem}>
        <ul className="list-group">
          {allNodeArticle.edges.map((props) => (
            <Article key={props.node.id} {...props} />
          ))}
        </ul>
      </Body>
      <StaffContact
        staffContact={userUser}
        title={title}
        location={path.alias}
      />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary:
      "DVRPC proudly serves as a resource for the region's media, sharing information about our work to improve mobility, the environment, and quality-of-life in Greater Philadelphia.",
    css: themeToCustomVars(nodeTheme, themeConfig),
  });

export const query = graphql`
  query ($regex: String!, $limit: Int, $skip: Int) {
    allNodeArticle(
      sort: { created: DESC }
      limit: $limit
      skip: $skip
      filter: {
        relationships: {
          field_tags: { elemMatch: { name: { eq: "Press Release" } } }
        }
      }
    ) {
      edges {
        node {
          title
          path {
            alias
          }
          created
        }
      }
    }
    userUser(mail: { eq: "ahastings@dvrpc.org" }) {
      id
      mail
      field_display_name
      field_title
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
    nodeTheme(id: { eq: "35c6397c-3d7c-5b57-9255-aedb0586ad90" }) {
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

export default DrupalPage;
