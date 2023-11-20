import React, { useState } from "react";
import { graphql, Link } from "gatsby";

import Body from "../../components/Body";
import HeadTemplate from "../../components/HeadTemplate";
import StaffContact from "../../components/StaffContact";
import Pager, { PagerProvider } from "../../components/Pager";
import { trunc } from "../../components/Product";

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
  <li className="list-none">
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

      <Link
        className="text-xl font-bold text-[#03688D] no-underline"
        to={node.path.alias}
      >
        {node.title}
      </Link>
      {node.relationships && (
        <p className="m-0 text-[#7A7A7A]">
          {node.relationships.field_tags.map((tag) => (
            <span>{tag.name}</span>
          ))}
        </p>
      )}
      <p>{node.body && node.body.summary}</p>
      <p>
        <Link
          className="flex font-bold text-[#03688D] no-underline"
          to={node.path.alias}
        >
          Read More
          <span className="my-auto mx-2 h-5 w-5 rounded-full bg-[#03688D] text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full scale-50 fill-current"
            >
              <path d="m5 3 3-3 12 12L8 24l-3-3 9-9z" />
            </svg>
          </span>
        </Link>
      </p>
    </div>
  </li>
);

const DrupalPage = ({ data, path }) => {
  const { allNodeArticle, userUser, navItem } = data;
  const provider = new PagerProvider(
    allNodeArticle.edges,
    (pageNumber) =>
      allNodeArticle.edges.slice(
        pageNumber * provider.itemsPerPage - provider.itemsPerPage,
        pageNumber * provider.itemsPerPage
      ),
    1,
    5
  );

  return (
    <>
      <Body title={title} menu={navItem}>
        <Pager
          provider={provider}
          renderItem={(props) => <Article key={props.node.id} {...props} />}
        />
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
          relationships {
            field_image {
              url
            }
            field_tags {
              name
            }
          }
          body {
            summary
          }
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
