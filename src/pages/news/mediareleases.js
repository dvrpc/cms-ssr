import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";

import HeadTemplate from "../../components/HeadTemplate";
import StaffContact from "../../components/StaffContact";
import Pager from "../../components/Pager";
import { trunc } from "../../components/Product";
import useDebounce from "../../components/useDebounce";
import HtmlParser from "../../components/HtmlParser";
import useQueryParamArray from "../../components/useQueryParamArray";
import NewsRoomInfo from "../../components/NewsRoomInfo";

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
  <li className="mb-4 list-none border-b-[3px] md:py-4">
    <div className="text-sm text-gray-500">
      {new Date(node.created)
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase()}
    </div>

    <div className="flex flex-col-reverse md:block">
      <p className="mb-0">
        <Link
          className="text-xl font-bold text-[#03688D] no-underline"
          to={node.path.alias}
        >
          {node.title}
        </Link>

        {node.relationships && (
          <p className="m-0 text-[#7A7A7A]">
            {node.relationships.field_tags.map((tag, idx) => (
              <>
                <Link
                  to={`/news/mediareleases/?filters=${tag.name.replace(
                    " ",
                    "-"
                  )}`}
                  className="no-underline hover:underline"
                >
                  {tag.name}
                </Link>
                {idx !== node.relationships.field_tags.length - 1 && ", "}
              </>
            ))}
          </p>
        )}
      </p>
      {node.relationships.field_image && (
        <img
          className="h-48 w-full border border-2 object-cover p-0.5 md:float-right md:ml-4 md:w-72"
          src={node.relationships.field_image.url}
          alt={node.field_image.alt}
        />
      )}
    </div>

    <p>
      {node.body && node.body.summary.length ? (
        node.body.summary
      ) : (
        <HtmlParser html={trunc(node.body.processed)} />
      )}
    </p>
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
  </li>
);

const SidebarContent = ({
  allTaxonomyTermTags,
  input,
  params,
  setParams,
  setInput,
}) => (
  <div className="w-full p-4">
    <input
      class="w-full appearance-none border py-2 px-3 leading-tight focus:outline-none"
      type="text"
      placeholder="Search news stories..."
      value={input}
      onChange={(event) => setInput(event.target.value)}
    ></input>
    <span className="flex">
      <h3 className="py-4 text-lg font-bold">FILTER RESULTS</h3>
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
          className="mr-2"
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
  const { allNodeArticle, userUser, allTaxonomyTermTags } = data;
  const [articles, setArticles] = useState(allNodeArticle.edges);
  const [input, setInput] = useState("");
  const debounceInput = useDebounce(input);
  const { params, setParams } = useQueryParamArray("filters");

  useEffect(() => {
    let articlesCopy = [...allNodeArticle.edges];
    if (params.size !== 0)
      articlesCopy = articlesCopy.filter((article) =>
        article.node.relationships.field_tags.some((item) =>
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
      <div className="container mx-auto flex flex-col-reverse gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:my-4 md:grid md:w-4/5 md:grid-cols-3">
        <div className="px-4 pt-0 print:p-0 md:col-span-2 md:col-start-2 md:row-start-2 md:mt-4 md:p-0">
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
                    <div className="mx-1  flex h-3 w-3 items-center justify-center rounded-full bg-[#B66216] text-sm text-white">
                      &times;
                    </div>
                  </button>
                ))}
              </p>
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
          <p className="mb-4 bg-[#EFF0F2] p-4">
            <input
              class="w-full appearance-none border border-2 border-[#707070] py-2 px-3 leading-tight focus:outline-none"
              type="text"
              placeholder="Search news stories..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            ></input>

            <button
              className="my-4 w-full rounded-lg border-2 border-[#707070] p-3 font-bold text-[#03688D] hover:bg-[]"
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
                  allTaxonomyTermTags={allTaxonomyTermTags}
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
              allTaxonomyTermTags={allTaxonomyTermTags}
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
      <StaffContact title={title} location={path.alias} />
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
