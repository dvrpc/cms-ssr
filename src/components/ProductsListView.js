import React, { useEffect } from "react";

import Body from "./Body";
import StaffContact from "./StaffContact";
import Product from "./Product";

const LIMIT = 10;

const ProductsListView = ({ children, data, serverData, location, title }) => {
  const { userUser, navItem } = data;
  const query = new URLSearchParams(location.search).get("q") ?? "";
  const offset = new URLSearchParams(location.search).get("offset") ?? 0;

  useEffect(() => window.document.querySelector("h1").scrollIntoView(), []);

  const highlight = (text, keywords) => {
    if (!text || !keywords) {
      return text;
    }
    return keywords
      .split(" ")
      .filter((word) => word.trim())
      .reduce(
        (current, word) =>
          current.replace(new RegExp(`(${word})`, "i"), "<strong>$1</strong>"),
        text
      );
  };

  const trunc = (str) => {
    if (!str) return "";
    return str.length > 400
      ? `${str.substring(0, 400)}${str.substring(400).split(" ")[0]}…`
      : str;
  };

  return (
    <>
      <Body title={title} menu={navItem}>
        {children}
        <form action="/products/" className="my-2">
          <input
            placeholder="Search by keyword"
            name="q"
            type="search"
            defaultValue={query}
            className="appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </form>
        {serverData.items
          .sort((a, b) => new Date(b.datelive) - new Date(a.datelive))
          .map((product) => (
            <Product
              key={product.id}
              {...product}
              Title={highlight(trunc(product.title), query)}
              Abstract={highlight(trunc(product.abstract), query)}
            />
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
            {serverData.items.length === LIMIT
              ? +offset + LIMIT
              : serverData.items.length}
          </span>
          <a
            href={
              serverData.items.length === LIMIT
                ? `?q=${query}&offset=${+offset + LIMIT}`
                : null
            }
            aria-disabled={serverData.items.length < LIMIT}
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
      </Body>
      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export default ProductsListView;
