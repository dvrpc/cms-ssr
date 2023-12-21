import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";

import HeadTemplate from "../../components/HeadTemplate";
import Pager from "../../components/Pager";
import { trunc } from "../../components/Product";
import useDebounce from "../../components/useDebounce";
import HtmlParser from "../../components/HtmlParser";
import useQueryParamArray from "../../components/useQueryParamArray";
import NewsRoomInfo from "../../components/newsroom/NewsRoomInfo";
import LogoBar from "../../components/LogoBar";
import Icon, { Search } from "../../components/Icon";
import NewsHeader from "../../images/NewsHeader.jpg";
import Footer from "../../components/Footer";

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

const Article = ({ node }) => {
  return (
    <li className="mb-6 list-none border-b-[1px] border-[#CDCDCD] md:py-2">
      <div className="text-[#595959]">
        {new Date(node.created).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      <div className="flex flex-col md:block">
        {node.relationships.field_image && (
          <img
            className="my-2 h-48 w-full border border-2 object-cover p-0.5 md:float-right md:my-0 md:ml-3 md:mb-2 md:w-72"
            src={node.relationships.field_image.url}
            alt={node.field_image.alt}
          />
        )}
        <p className="my-1">
          <Link
            className="text-2xl font-bold leading-6 text-[#03688D] no-underline hover:underline md:leading-7"
            to={node.path.alias}
          >
            {node.title}
          </Link>

          {node.relationships && (
            <p
              className="mb-0.5 mt-0.5 text-sm text-[#7A7A7A] md:mt-1 md:mb-3"
              style={{ fontFamily: "Roboto Condensed" }}
            >
              {node.relationships.field_categories.map((ctg, idx) => (
                <>
                  <Link
                    to={`/news/mediareleases/?filters=${ctg.name
                      .replace(/\s/g, "-")
                      .replace(/\&/g, "and")}`}
                    className="no-underline hover:underline"
                  >
                    {ctg.name}
                  </Link>
                  {idx !== node.relationships.field_categories.length - 1 &&
                    ", "}
                </>
              ))}
              {node.relationships.field_tags.map((tag, idx) => (
                <>
                  {node.relationships.field_categories.length > 0 && ", "}
                  <span>{tag.name}</span>
                  {idx !== node.relationships.field_tags.length - 1 && ", "}
                </>
              ))}
            </p>
          )}
        </p>
      </div>

      <div className="my-2 md:my-1">
        {node.body && node.body.summary.length ? (
          node.body.summary
        ) : (
          <HtmlParser html={trunc(node.body.processed)} />
        )}
      </div>
      <p className="mt-2 mb-6 md:my-2.5 md:mb-0">
        <Link
          className="flex font-bold text-[#03688D] no-underline hover:underline md:mb-2"
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
    </li>
  );
};

const SidebarContent = ({
  allTaxonomyTermTags,
  input,
  params,
  setParams,
  setInput,
}) => (
  <div className="w-full md:p-4">
    <input
      class="w-full appearance-none border py-2 px-3 leading-tight focus:outline-none"
      type="text"
      placeholder="Search news stories..."
      value={input}
      onChange={(event) => setInput(event.target.value)}
    ></input>
    <span className="flex">
      <h3 className="py-4 text-lg font-bold tracking-wider">FILTER RESULTS</h3>
      <button
        className="ml-auto text-[#03688D]"
        onClick={() => {
          document
            .querySelectorAll("input[type=checkbox]")
            .forEach((el) => (el.checked = false));
          setParams(new Set());
        }}
      >
        clear all
      </button>
    </span>
    <p className="font-bold">Topic</p>
    {allTaxonomyTermTags.edges.map((tag) => (
      <label key={tag.node.name} className="flex items-center">
        <input
          className="mr-2 accent-[#03688D]"
          type="checkbox"
          value={tag.node.name}
          onChange={(event) => {
            setParams((prev) => {
              if (event.target.checked) prev.add(event.target.value);
              else prev.delete(event.target.value);
              return new Set(prev);
            });
          }}
          checked={params.size && params.has(tag.node.name)}
        ></input>
        {tag.node.name}
      </label>
    ))}
  </div>
);

const DrupalPage = ({ data, path }) => {
  const {
    allNodeArticle,
    userUser,
    allTaxonomyTermTags,
    allTaxonomyTermCategories,
  } = data;
  const [articles, setArticles] = useState(allNodeArticle.edges);
  const [input, setInput] = useState("");
  const debounceInput = useDebounce(input);
  const { params, setParams } = useQueryParamArray("filters");

  useEffect(() => {
    let articlesCopy = [...allNodeArticle.edges];
    if (params.size !== 0)
      articlesCopy = articlesCopy.filter((article) =>
        article.node.relationships.field_categories.some((item) =>
          params.has(item.name)
        )
      );
    if (debounceInput.length)
      articlesCopy = articlesCopy.filter((article) =>
        article.node.title.toLowerCase().includes(debounceInput.toLowerCase())
      );

    setArticles(articlesCopy);
  }, [params, debounceInput, allNodeArticle, setArticles]);

  const toggleModal = (event) => {
    event.preventDefault();
    document.getElementById("modal-background").classList.toggle("hidden");
    document.getElementById("modal").classList.toggle("hidden");
  };

  return (
    <>
      <header className="bg-white print:hidden">
        <LogoBar />
        <div
          className="relative h-[250px] w-full bg-cover bg-center bg-no-repeat md:h-[400px]"
          style={{ backgroundImage: `url(${NewsHeader})` }}
        >
          <div className="container mx-auto p-8 md:px-0">
            <form
              className="relative mb-4 bg-gradient-to-r from-white/80 via-white/80 to-transparent md:w-min md:pr-32"
              action="https://www.dvrpc.org/Search/"
            >
              <div className="pointer-events-none absolute flex h-full w-10 items-center justify-center">
                <Icon
                  use={Search}
                  className="inline-block h-6 flex-shrink-0 select-none text-gray-600"
                />
              </div>
              <div>
                <input
                  name="q"
                  placeholder="Search..."
                  aria-label="Search"
                  className="m-0 block w-72 min-w-0 border-0 border-none bg-transparent p-2 pl-10 placeholder-gray-600 focus:outline-none md:pl-12"
                />
              </div>
            </form>
          </div>
        </div>
      </header>
      <div className="container mx-auto flex flex-col-reverse gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:my-4 md:grid md:w-4/5 md:grid-cols-3">
        <div className="px-7 pt-0 print:p-0 md:col-span-2 md:col-start-2 md:row-start-2 md:mt-4 md:p-0">
          <main className="max-w-[80ch] print:max-w-full">
            <article>
              <p className="m-0 flex h-min">
                {Array.from(params).map((param) => (
                  <button
                    className="mr-2 mb-4 flex items-center font-bold text-[#B66216]"
                    onClick={() => {
                      setParams((prev) => {
                        prev.delete(param);
                        return new Set(prev);
                      });
                    }}
                  >
                    {param}{" "}
                    <div className="mx-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#B66216] text-white">
                      &times;
                    </div>
                  </button>
                ))}
              </p>
              {!articles.length && (
                <div className="prose flex min-w-full flex-col items-center justify-center text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0,0,256,256"
                    width="120px"
                    height="120px"
                  >
                    <g fill="#d1d5db">
                      <g transform="scale(8.53333,8.53333)">
                        <path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z" />
                      </g>
                    </g>
                  </svg>
                  <h1 className="mb-0 text-2xl">Sorry no results found</h1>
                  <div>Try searching/filtering again...</div>
                </div>
              )}

              <Pager
                items={articles}
                onPageChange={(pageNumber) =>
                  articles.slice(pageNumber * 5 - 5, pageNumber * 5)
                }
                itemsPerPage={5}
                renderItem={(props) => (
                  <Article key={props.node.id} {...props} />
                )}
              />
            </article>
          </main>
        </div>

        <div className="block md:hidden">
          <p className="mb-4 bg-[#EFF0F2] p-4 px-8">
            <input
              class="border-1 my-2 w-full appearance-none border border-[#707070] py-2 px-3 leading-tight focus:outline-none"
              type="text"
              placeholder="Search news stories..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            ></input>

            <button
              className="my-2 w-full rounded-lg border border-[#707070] p-2 font-bold tracking-wider text-[#03688D] hover:bg-[]"
              onClick={toggleModal}
            >
              FILTER RESULTS
            </button>
          </p>
          <div
            id="modal-background"
            className="fixed inset-0 hidden bg-black bg-opacity-75 transition-opacity"
          ></div>
          <div
            id="modal"
            className="fixed inset-0 z-10 hidden w-screen overflow-y-auto"
          >
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform bg-[#EFF0F2] p-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <button
                  className="absolute -right-3 -top-2 z-[999] mx-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#03688D] text-xl text-white"
                  onClick={toggleModal}
                >
                  &times;
                </button>
                <SidebarContent
                  allTaxonomyTermTags={allTaxonomyTermCategories}
                  input={input}
                  params={params}
                  setInput={setInput}
                  setParams={setParams}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden space-y-4 p-4 print:hidden md:col-span-1 md:col-start-1 md:row-start-2 md:mt-4 md:flex md:flex-col md:items-end md:p-0">
          <div className="w-full bg-[#EFF0F2]">
            <SidebarContent
              allTaxonomyTermTags={allTaxonomyTermCategories}
              input={input}
              params={params}
              setInput={setInput}
              setParams={setParams}
            />
          </div>
          <NewsRoomInfo />
        </div>
      </div>
      <div className="block w-full md:hidden">
        <NewsRoomInfo />
      </div>
      <Footer />
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
  query ($limit: Int, $skip: Int) {
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
            field_categories {
              name
            }
          }
          field_image {
            alt
          }
          body {
            summary
            processed
          }
        }
      }
    }
    allTaxonomyTermCategories {
      edges {
        node {
          name
          relationships {
            node__article {
              id
            }
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
