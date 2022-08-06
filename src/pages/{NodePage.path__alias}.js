import * as React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import parseHtml from "../utils/parseHtml";

import Header from "../components/Header";
import Body from "../components/Body";
import StaffContact from "../components/StaffContact";
import Footer from "../components/Footer";

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
          (obj) =>
            `url(${obj.localFile.childImageSharp.gatsbyImageData.images.fallback.src})`
        )
        .join(", "),
  ],
  ["field_photo_credits", "--content-photo-credits", (val) => `"${val}"`],
  ["relationships.field_banner", "--height-banner", () => "400px"],
];

const themeToCustomVars = (theme, config) => {
  return config
    .map(([key, customVar, parseFunc = (v) => v]) => {
      const val = key
        .split(".")
        .reduce((prev, cur) => prev && prev[cur], theme);
      return val ? `${customVar}: ${parseFunc(val)};` : null;
    })
    .join("\n");
};

const DrupalPage = ({
  data: {
    navItem,
    nodePage: {
      body,
      title,
      path,
      relationships: { field_staff_contact, field_theme },
    },
  },
}) => {
  return (
    <>
      <Helmet titleTemplate="%s | DVRPC">
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={body?.summary} />
        <style>
          {`:root {
            ${themeToCustomVars(field_theme, themeConfig)}
          }`}
        </style>
      </Helmet>
      <Header />
      <Body title={title} menu={navItem}>
        {parseHtml(body?.processed ?? "")}
      </Body>
      <StaffContact
        staffContact={field_staff_contact}
        title={title}
        location={path.alias}
      />
      <Footer />
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
            field_banner {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 1600, height: 400, formats: [WEBP])
                }
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
export default DrupalPage;
