import React, { useEffect, useState } from "react";
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
  const { allNodeArticle, userUser, navItem, allTaxonomyTermTags } = data;
  const [articles, setArticles] = useState(allNodeArticle.edges);
  const [filters, setFilters] = useState(new Set());

  useEffect(() => {
    if (filters.size !== 0)
      setArticles(
        articles.filter((article) =>
          article.node.relationships.field_tags.some((item) =>
            filters.has(item.name)
          )
        )
      );
    else setArticles(allNodeArticle.edges);
  }, [filters]);

  return (
    <>
      <div className="container mx-auto my-4 grid gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:grid-cols-3">
        <div className="px-4 pt-0 print:p-0 md:col-span-2 md:col-start-2 md:row-start-2 md:mt-4 md:p-0">
          <main className="max-w-[80ch] print:max-w-full">
            <article>
              <Pager
                items={articles}
                onPageChange={(pageNumber) =>
                  articles.slice(
                    pageNumber * provider.itemsPerPage - provider.itemsPerPage,
                    pageNumber * provider.itemsPerPage
                  )
                }
                itemsPerPage={5}
                renderItem={(props) => (
                  <Article key={props.node.id} {...props} />
                )}
              />
            </article>
          </main>
        </div>
        <div className="flex flex-col space-y-4 p-4 print:hidden md:col-span-1 md:col-start-1 md:row-start-2 md:mt-4 md:items-end md:p-0">
          <div className="w-full bg-[#EFF0F2] p-4">
            <input
              class=" w-full appearance-none border py-2 px-3 leading-tight focus:outline-none"
              type="text"
              placeholder="Search news stories..."
            ></input>
            <span className="flex">
              <h3 className="py-4 text-lg font-bold">FILTER RESULTS</h3>
              <button className="ml-auto text-[#03688D]">clear all</button>
            </span>
            <p className="font-bold">Topic</p>
            {allTaxonomyTermTags.edges.map((tag) => (
              <label className="block">
                <input
                  className="pr-2"
                  type="checkbox"
                  value={tag.node.name}
                  onChange={(event) => {
                    setFilters((prev) => {
                      if (event.target.checked) prev.add(event.target.value);
                      else prev.delete(event.target.value);
                      return new Set(prev);
                    });
                  }}
                ></input>
                {tag.node.name}
              </label>
            ))}
          </div>
          <div className="w-full bg-[#EFF0F2] p-4 [&>*]:my-2">
            <h3 className="text-lg font-bold">MEDIA</h3>
            <p className="font-bold">Resources</p>
            <hr className="!m-0 border border-[#CDCDCD]" />
            <p>
              <a
                className="text-[#03688D] hover:underline"
                href="https://www.dvrpc.org/photosandlogos/pdf/dvrpc_logoguidelines.pdf"
              >
                DVRPC Logos and Guidelines
              </a>
              <br />
              <a
                className="text-[#03688D] hover:underline"
                href="https://www.dvrpc.org/photosandlogos/"
              >
                Executive Director and Headshots
              </a>
            </p>
            <p className="font-bold">Contact</p>
            <hr className="!m-0 border border-[#CDCDCD]" />
            <p className="my-2">
              Elise Turner:{" "}
              <a
                className="text-[#03688D] hover:underline"
                href="mailto:eturner@dvrpc.org"
              >
                eturner@dvrpc.org
              </a>
            </p>
          </div>
        </div>
      </div>
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
    allNodeArticle(sort: { created: DESC }, limit: $limit, skip: $skip) {
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
    allTaxonomyTermTags {
      edges {
        node {
          name
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
