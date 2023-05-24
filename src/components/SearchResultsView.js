import React, { useEffect } from "react";

import Body from "./Body";
import StaffContact from "./StaffContact";
import HtmlParser from "./HtmlParser";

const LIMIT = 10;

const SearchResultsView = ({ data, serverData, location, title }) => {
  const { userUser, navItem } = data;
  const { items, searchInformation } = serverData;
  const query = new URLSearchParams(location.search).get("q") ?? "";
  const offset = new URLSearchParams(location.search).get("offset") ?? 0;
  useEffect(() => window.document.querySelector("h1").scrollIntoView(), []);

  return (
    <>
      <Body title="Search Results" menu={navItem}>
        <form className="my-2 grid grid-cols-[1fr,auto]">
          <input
            placeholder="Search by keyword"
            name="q"
            type="search"
            className="appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {searchInformation && (
            <span className="py-2 px-3 font-bold leading-tight text-gray-700">
              {searchInformation?.totalResults} results found
            </span>
          )}
        </form>
        {query ? (
          <div>
            {items.map((result) => (
              <div
                key={result.link}
                className="mb-4 space-y-1 border-b border-gray-200 pb-4"
              >
                <p className="mb-0 text-sm text-gray-700">
                  <HtmlParser html={result.htmlFormattedUrl} />
                </p>
                <a
                  href={result.link}
                  className="text-2xl text-[color:var(--color-h1)] no-underline"
                >
                  <HtmlParser html={result.htmlTitle} />
                </a>
                <p>
                  <HtmlParser html={result.htmlSnippet} />
                </p>
                <p>
                  <a
                    className="font-bold text-[color:var(--color-h1)] no-underline hover:underline"
                    href={result.link}
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      className="ml-1 inline origin-top scale-75 fill-current"
                    >
                      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 18-1-1 5-5-5-5 1-1 6 6-6 6z" />
                    </svg>
                  </a>
                </p>
              </div>
            ))}
            <div className="my-6 flex justify-around font-bold text-[color:var(--color-default)]">
              <a
                href={+offset ? `?q=${query}&offset=${+offset - LIMIT}` : null}
                aria-disabled={+offset === 0}
                aria-label="Previous"
                className="aria-disabled:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="origin-top scale-75 fill-current"
                >
                  <path d="m17 0 3 3-10 9 10 9-3 3L5 12z" />
                </svg>
              </a>
              <span>
                {+offset + 1} &ndash;{" "}
                {items.length === LIMIT ? +offset + LIMIT : items.length}
              </span>
              <a
                href={
                  items.length === LIMIT
                    ? `?q=${query}&offset=${+offset + LIMIT}`
                    : null
                }
                aria-disabled={items.length < LIMIT}
                aria-label="Next"
                className="aria-disabled:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="origin-top scale-75 fill-current "
                >
                  <path d="m5 3 3-3 12 12L8 24l-3-3 9-9z" />
                </svg>
              </a>
            </div>
          </div>
        ) : null}
      </Body>
      <StaffContact staffContact={userUser} title={title} location={location} />
    </>
  );
};

export default SearchResultsView;
