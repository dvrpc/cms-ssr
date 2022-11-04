import * as React from "react";
import { graphql } from "gatsby";
import parseHtml from "../utils/parseHtml";

import Body from "../components/Body";
import StaffContact from "../components/StaffContact";

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
        .reverse()
        .join(", "),
  ],
  [
    "relationships.field_banner_2x",
    "--bg-cover-image",
    (val) =>
      val
        .map(
          (obj) =>
            `url(${obj.localFile.childImageSharp.gatsbyImageData.images.fallback.src})`
        )
        .reverse()
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
      return parseFunc(val) ? `${customVar}: ${parseFunc(val)};` : null;
    })
    .join("\n");
};

const DrupalPage = ({ data }) => {
  const {
    documents,
    images,
    navItem,
    nodePage: { body, title, path, relationships },
  } = data;
  return (
    <>
      <Body title={title} menu={navItem}>
        {parseHtml(body?.processed ?? "", { documents, images })}
      </Body>
      <StaffContact
        staffContact={relationships?.field_staff_contact ?? {}}
        title={title}
        location={path.alias}
      />
    </>
  );
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
      {body.summary && <meta name="description" content={body?.summary} />}
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
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 3200
                    height: 800
                    quality: 100
                    outputPixelDensities: [1]
                    formats: [WEBP]
                  )
                }
              }
            }
            field_banner {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1600
                    height: 400
                    quality: 100
                    outputPixelDensities: [1]
                    formats: [WEBP]
                  )
                }
              }
            }
          }
        }
      }
    }
    images: allFileFile(
      filter: {
        filemime: {
          in: [
            "image/png"
            "image/jpeg"
            "image/gif"
            "image/svg+xml"
            "image/webp"
          ]
        }
      }
    ) {
      edges {
        node {
          drupal_id
          uri {
            url
          }
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    documents: allFileFile(
      filter: {
        filemime: {
          in: [
            "application/pdf"
            "application/msword"
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            "application/vnd.ms-excel"
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            "application/zip"
          ]
        }
      }
    ) {
      edges {
        node {
          drupal_id
          filename
          localFile {
            publicURL
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

export const config = async () => ({ defer: true });

export default DrupalPage;
