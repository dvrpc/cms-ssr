import * as React from "react";
import { graphql } from "gatsby";
import { isMatch, matcher } from "matcher";
import DrupalPage from "../components/DrupalPage";
import DataPage from "../components/DataPage";

const templates = {
  "/**": DrupalPage,
  "/data/**": DataPage,
};

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
        .map((obj) => `url(https://cdn.dvrpc.org${obj.uri.url})`)
        .reverse()
        .join(", "),
  ],
  [
    "relationships.field_banner_2x",
    "--bg-cover-image",
    (val) =>
      val
        .map((obj) => `url(https://cdn.dvrpc.org${obj.uri.url})`)
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

const resolveTemplate = (url) => {
  const match = Object.keys(templates).filter((r) => isMatch(url, r));
  return templates[match[0]];
};

const Page = (props) => {
  const Template = resolveTemplate(props.path);
  return <Template {...props} />;
};

export const Head = ({ data }) => {
  const {
    nodePage: {
      body,
      title,
      relationships: { field_theme },
    },
  } = data;
  return (
    <>
      <title>{title} | DVRPC</title>
      {body?.summary && <meta name="description" content={body?.summary} />}
      <style>
        {`:root {
            ${themeToCustomVars(field_theme, themeConfig)}
          }`}
      </style>
    </>
  );
};

export const query = graphql`
  query ($id: String, $regex: String!) {
    nodePage(id: { eq: $id }) {
      id
      title
      body {
        processed
        summary
      }
      path {
        alias
      }
      relationships {
        field_staff_contact {
          field_display_name
          field_title
          mail
        }
        field_theme {
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

export default Page;
